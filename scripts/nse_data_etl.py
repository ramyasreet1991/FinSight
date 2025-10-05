#!/usr/bin/env python3
"""
NSE Data ETL Script for Live Multibagger Analysis
Fetches Nifty Smallcap250 Momentum Quality 100 constituents and news data
"""

import pandas as pd
import requests
import feedparser
import time
import json
import csv
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class NSEDataETL:
    def __init__(self):
        self.base_url = "https://www.niftyindices.com"
        self.nse_base_url = "https://www.nseindia.com"
        self.fallback_url = "https://www.smart-investing.in/indices-bse-nse.php?index=NFTSML250MOMQ100"
        
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
        
        # NSE RSS feeds for news
        self.nse_rss_feeds = [
            "https://nsearchives.nseindia.com/content/RSS/Financial_Results.xml",
            "https://nsearchives.nseindia.com/content/RSS/Insider_Trading.xml",
            "https://nsearchives.nseindia.com/content/RSS/Board_Meeting.xml",
            "https://nsearchives.nseindia.com/content/RSS/Corporate_Announcement.xml",
            "https://nsearchives.nseindia.com/content/RSS/New_Listing.xml",
        ]

    def fetch_constituents(self) -> pd.DataFrame:
        """Fetch Nifty Smallcap250 Momentum Quality 100 constituents"""
        logger.info("Fetching index constituents...")
        
        try:
            # Try official NSE page first
            index_page = "https://www.niftyindices.com/indices/equity/strategy-indices/nifty-smallcap250-momentum-quality-100"
            
            response = requests.get(index_page, headers=self.headers, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Look for CSV download link
            csv_link = None
            for link in soup.find_all('a', href=True):
                if 'csv' in link.get('href', '').lower() or 'download' in link.get_text().lower():
                    csv_link = link.get('href')
                    break
            
            if csv_link:
                if csv_link.startswith('/'):
                    csv_link = self.base_url + csv_link
                
                logger.info(f"Found CSV link: {csv_link}")
                df = pd.read_csv(csv_link)
                
                # Clean column names
                df.columns = df.columns.str.strip()
                
                # Find symbol and name columns
                symbol_col = None
                name_col = None
                
                for col in df.columns:
                    if 'symbol' in col.lower():
                        symbol_col = col
                    elif 'name' in col.lower() and 'company' in col.lower():
                        name_col = col
                
                if symbol_col and name_col:
                    result = df[[symbol_col, name_col]].copy()
                    result.columns = ['symbol', 'name']
                    result = result.dropna().drop_duplicates()
                    logger.info(f"Successfully fetched {len(result)} constituents from official source")
                    return result
            
            # Fallback to scraping the page
            logger.info("CSV link not found, trying to scrape table...")
            
            # Look for table with constituents
            table = soup.find('table')
            if table:
                rows = []
                for tr in table.find_all('tr')[1:]:  # Skip header
                    cells = [td.get_text(strip=True) for td in tr.find_all(['td', 'th'])]
                    if len(cells) >= 2:
                        rows.append(cells[:2])
                
                if rows:
                    df = pd.DataFrame(rows, columns=['symbol', 'name'])
                    df = df.dropna().drop_duplicates()
                    logger.info(f"Successfully scraped {len(df)} constituents from table")
                    return df
            
            # Final fallback to mirror site
            logger.info("Trying fallback mirror site...")
            return self._fetch_from_fallback()
            
        except Exception as e:
            logger.error(f"Error fetching constituents: {e}")
            return self._fetch_from_fallback()

    def _fetch_from_fallback(self) -> pd.DataFrame:
        """Fetch from fallback mirror site"""
        try:
            response = requests.get(self.fallback_url, headers=self.headers, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            table = soup.find('table')
            
            if table:
                rows = []
                for tr in table.find_all('tr')[1:]:  # Skip header
                    cells = [td.get_text(strip=True) for td in tr.find_all(['td', 'th'])]
                    if len(cells) >= 2:
                        rows.append(cells[:2])
                
                if rows:
                    df = pd.DataFrame(rows, columns=['name', 'weight'])
                    df['symbol'] = df['name'].str.split().str[0]  # Extract symbol from name
                    result = df[['symbol', 'name']].dropna().drop_duplicates()
                    logger.info(f"Successfully fetched {len(result)} constituents from fallback")
                    return result
            
            # If all else fails, return mock data
            logger.warning("All sources failed, returning mock data")
            return self._get_mock_constituents()
            
        except Exception as e:
            logger.error(f"Error with fallback: {e}")
            return self._get_mock_constituents()

    def _get_mock_constituents(self) -> pd.DataFrame:
        """Return mock constituents if all sources fail"""
        mock_data = [
            {'symbol': 'BALRAMCHIN', 'name': 'Balrampur Chini Mills Ltd'},
            {'symbol': 'BATAINDIA', 'name': 'Bata India Ltd'},
            {'symbol': 'BHEL', 'name': 'Bharat Heavy Electricals Ltd'},
            {'symbol': 'COALINDIA', 'name': 'Coal India Ltd'},
            {'symbol': 'DIVISLAB', 'name': 'Divi\'s Laboratories Ltd'},
            {'symbol': 'EICHERMOT', 'name': 'Eicher Motors Ltd'},
            {'symbol': 'GAIL', 'name': 'GAIL (India) Ltd'},
            {'symbol': 'HINDALCO', 'name': 'Hindalco Industries Ltd'},
            {'symbol': 'INDUSINDBK', 'name': 'IndusInd Bank Ltd'},
            {'symbol': 'JSWSTEEL', 'name': 'JSW Steel Ltd'},
        ]
        return pd.DataFrame(mock_data)

    def fetch_news_for_symbol(self, symbol: str, limit: int = 5) -> List[Dict]:
        """Fetch recent news for a symbol"""
        news_items = []
        
        try:
            for feed_url in self.nse_rss_feeds:
                try:
                    feed = feedparser.parse(feed_url)
                    
                    for entry in feed.entries[:100]:  # Check first 100 entries
                        title = entry.get('title', '').lower()
                        summary = entry.get('summary', '').lower()
                        
                        # Check if symbol appears in title or summary
                        if symbol.lower() in title or symbol.lower() in summary:
                            news_items.append({
                                'title': entry.get('title', ''),
                                'link': entry.get('link', ''),
                                'published': entry.get('published', ''),
                                'source': 'NSE',
                                'category': self._categorize_news(title),
                                'symbol': symbol
                            })
                            
                            if len(news_items) >= limit:
                                break
                    
                    time.sleep(0.1)  # Rate limiting
                    
                except Exception as e:
                    logger.warning(f"Error parsing feed {feed_url}: {e}")
                    continue
                    
        except Exception as e:
            logger.error(f"Error fetching news for {symbol}: {e}")
        
        # Sort by published date and return recent items
        news_items.sort(key=lambda x: x.get('published', ''), reverse=True)
        return news_items[:limit]

    def _categorize_news(self, title: str) -> str:
        """Categorize news based on title"""
        title_lower = title.lower()
        
        if any(word in title_lower for word in ['result', 'earning', 'profit', 'revenue']):
            return 'Financial Results'
        elif any(word in title_lower for word in ['insider', 'promoter', 'pledge']):
            return 'Insider Trading'
        elif any(word in title_lower for word in ['board', 'meeting', 'agenda']):
            return 'Board Meeting'
        elif any(word in title_lower for word in ['announcement', 'notice']):
            return 'Corporate Announcement'
        else:
            return 'General'

    def build_complete_dataset(self) -> pd.DataFrame:
        """Build complete dataset with constituents and news"""
        logger.info("Building complete dataset...")
        
        # Fetch constituents
        constituents = self.fetch_constituents()
        
        # Add scoring columns
        scoring_columns = [
            'Revenue & Profit Growth',
            'Large Market / Sector Growth', 
            'Scalability & Operating Leverage',
            'Strong Management',
            'Low or Manageable Debt',
            'Positive Cash Flow',
            'Competitive Advantage (Moat)',
            'Undervaluation / Mispricing',
            'Small-to-Mid Cap Growth Potential',
            'Price Momentum / Market Recognition'
        ]
        
        for col in scoring_columns:
            constituents[col] = None
        
        # Add news columns
        constituents['news_titles'] = ''
        constituents['news_links'] = ''
        constituents['news_categories'] = ''
        constituents['last_news_update'] = ''
        
        # Fetch news for each symbol
        logger.info(f"Fetching news for {len(constituents)} symbols...")
        
        for idx, row in constituents.iterrows():
            symbol = row['symbol']
            logger.info(f"Processing {symbol}...")
            
            try:
                news_items = self.fetch_news_for_symbol(symbol, limit=3)
                
                if news_items:
                    constituents.at[idx, 'news_titles'] = ' | '.join([item['title'] for item in news_items])
                    constituents.at[idx, 'news_links'] = ' | '.join([item['link'] for item in news_items])
                    constituents.at[idx, 'news_categories'] = ' | '.join([item['category'] for item in news_items])
                    constituents.at[idx, 'last_news_update'] = news_items[0]['published'] if news_items else ''
                
                time.sleep(0.2)  # Rate limiting
                
            except Exception as e:
                logger.error(f"Error processing {symbol}: {e}")
                continue
        
        # Add metadata
        constituents['data_fetch_date'] = datetime.now().isoformat()
        constituents['index_name'] = 'Nifty Smallcap250 Momentum Quality 100'
        
        logger.info(f"Dataset built successfully with {len(constituents)} rows")
        return constituents

    def export_to_csv(self, filename: str = None) -> str:
        """Export dataset to CSV"""
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"nifty_smallcap_momentum_data_{timestamp}.csv"
        
        df = self.build_complete_dataset()
        df.to_csv(filename, index=False)
        
        logger.info(f"Data exported to {filename}")
        return filename

    def export_to_json(self, filename: str = None) -> str:
        """Export dataset to JSON"""
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"nifty_smallcap_momentum_data_{timestamp}.json"
        
        df = self.build_complete_dataset()
        df.to_json(filename, orient='records', indent=2)
        
        logger.info(f"Data exported to {filename}")
        return filename

def main():
    """Main function to run the ETL process"""
    logger.info("Starting NSE Data ETL Process...")
    
    etl = NSEDataETL()
    
    try:
        # Export to both CSV and JSON
        csv_file = etl.export_to_csv()
        json_file = etl.export_to_json()
        
        logger.info("ETL process completed successfully!")
        logger.info(f"Files created: {csv_file}, {json_file}")
        
        # Print summary
        df = pd.read_csv(csv_file)
        logger.info(f"Dataset summary:")
        logger.info(f"  - Total symbols: {len(df)}")
        logger.info(f"  - Symbols with news: {len(df[df['news_titles'] != ''])}")
        logger.info(f"  - Data fetch date: {df['data_fetch_date'].iloc[0]}")
        
    except Exception as e:
        logger.error(f"ETL process failed: {e}")
        raise

if __name__ == "__main__":
    main()
