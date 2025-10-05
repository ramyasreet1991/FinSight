# NSE Data ETL for Live Multibagger Analysis

This ETL (Extract, Transform, Load) system fetches live data from NSE (National Stock Exchange) for the **Nifty Smallcap250 Momentum Quality 100** index and enriches it with news data for automated multibagger analysis.

## 🎯 Purpose

Automate the collection of:
- **Index constituents** from Nifty Smallcap250 Momentum Quality 100
- **Real-time news & announcements** for each stock
- **Structured data** ready for AI-powered multibagger scoring

## 📋 Features

### ✅ Data Sources
- **Official NSE Index**: Nifty Smallcap250 Momentum Quality 100 constituents
- **NSE RSS Feeds**: Financial results, insider trading, board meetings, corporate announcements
- **Fallback Sources**: Mirror sites when official sources are unavailable
- **Mock Data**: Backup data for testing and development

### ✅ Data Output
- **CSV Export**: Spreadsheet-compatible format
- **JSON Export**: API-ready structured data
- **Real-time News**: Latest 3-5 news items per stock
- **Metadata**: Timestamps, source tracking, data quality indicators

### ✅ Robust Error Handling
- **Multiple Data Sources**: Automatic fallback chain
- **Rate Limiting**: Respectful API usage
- **Retry Logic**: Built-in error recovery
- **Comprehensive Logging**: Detailed execution tracking

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd scripts
pip install -r requirements.txt
```

### 2. Run ETL Process
```bash
# Basic run (exports both CSV and JSON)
python run_etl.py

# Export only CSV
python run_etl.py --format csv

# Export only JSON
python run_etl.py --format json

# Limit to 10 symbols for testing
python run_etl.py --limit 10

# Custom output filename
python run_etl.py --output my_data --format both
```

### 3. Expected Output
```
🚀 Starting NSE Data ETL Process...
📅 Timestamp: 2024-01-15 14:30:25
📊 Output format: both
📈 Fetching index constituents...
✅ CSV exported: nifty_smallcap_momentum_data_20240115_143025.csv
✅ JSON exported: nifty_smallcap_momentum_data_20240115_143025.json

📋 Dataset Summary:
   📊 Total symbols: 100
   📰 Symbols with news: 87
   📅 Data fetch date: 2024-01-15T14:30:25.123456
   🔝 Sample symbols: BALRAMCHIN, BATAINDIA, BHEL, COALINDIA, DIVISLAB

🎉 ETL Process Completed Successfully!
📁 Files created: nifty_smallcap_momentum_data_20240115_143025.csv, nifty_smallcap_momentum_data_20240115_143025.json
```

## 📊 Data Schema

### CSV/JSON Structure
```csv
symbol,name,Revenue & Profit Growth,Large Market / Sector Growth,...,news_titles,news_links,data_fetch_date,index_name
BALRAMCHIN,Balrampur Chini Mills Ltd,,,,,"Q3 Results Beat | Promoter Transaction",https://nse.com/result1 | https://nse.com/insider1,2024-01-15T14:30:25,Nifty Smallcap250 Momentum Quality 100
```

### Key Columns
- **symbol**: Stock ticker symbol
- **name**: Full company name
- **Revenue & Profit Growth**: Multibagger characteristic score (to be filled by AI)
- **Large Market / Sector Growth**: Multibagger characteristic score
- **...**: All 10 multibagger characteristics
- **news_titles**: Recent news headlines (pipe-separated)
- **news_links**: Corresponding news URLs (pipe-separated)
- **data_fetch_date**: ISO timestamp of data collection

## 🔄 Automation Options

### Option 1: Cron Job (Linux/Mac)
```bash
# Add to crontab for daily 9 AM runs
0 9 * * * cd /path/to/scripts && python run_etl.py --format both >> etl.log 2>&1
```

### Option 2: Windows Task Scheduler
- Create basic task
- Set trigger: Daily at 9:00 AM
- Action: Start program `python run_etl.py`

### Option 3: GitHub Actions (Cloud)
```yaml
name: Daily NSE Data ETL
on:
  schedule:
    - cron: '0 9 * * *'  # 9 AM UTC daily
jobs:
  etl:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - name: Install dependencies
        run: pip install -r scripts/requirements.txt
      - name: Run ETL
        run: cd scripts && python run_etl.py --format both
```

## 🤖 Integration with AI Scoring

### 1. Data Pipeline
```python
# Load ETL data
df = pd.read_csv('nifty_smallcap_momentum_data_20240115_143025.csv')

# For each row, generate multibagger score
for idx, row in df.iterrows():
    prompt = f"""
    Evaluate {row['symbol']} ({row['name']}) for multibagger potential.
    
    Recent News:
    {row['news_titles']}
    
    Score each characteristic (1/0.5/0):
    1. Revenue & Profit Growth
    2. Large Market / Sector Growth
    ...
    """
    
    # Send to LLM API (OpenRouter, OpenAI, etc.)
    scores = call_llm_api(prompt)
    
    # Update dataframe
    df.at[idx, 'Revenue & Profit Growth'] = scores['growth']
    # ... update other characteristics
```

### 2. React Frontend Integration
```typescript
// Load data into React component
const loadETLData = async () => {
  const response = await fetch('/api/etl-data');
  const data = await response.json();
  setStocks(data);
};
```

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Custom API endpoints
export NSE_BASE_URL="https://www.niftyindices.com"
export NSE_RSS_BASE="https://nsearchives.nseindia.com"

# Optional: Rate limiting
export ETL_DELAY_MS=200
export MAX_RETRIES=3
```

### Custom RSS Feeds
Edit `nse_data_etl.py` to add more RSS sources:
```python
self.nse_rss_feeds = [
    "https://nsearchives.nseindia.com/content/RSS/Financial_Results.xml",
    "https://nsearchives.nseindia.com/content/RSS/Insider_Trading.xml",
    # Add your custom feeds here
    "https://your-custom-feed.com/rss.xml"
]
```

## 📈 Performance & Scaling

### Current Performance
- **~100 symbols**: 2-3 minutes
- **Rate limiting**: 0.2s delay between requests
- **Memory usage**: ~50MB for full dataset
- **Output size**: ~500KB CSV, ~1MB JSON

### Scaling Considerations
- **Parallel processing**: Use `concurrent.futures` for faster news fetching
- **Caching**: Implement Redis/Memcached for repeated requests
- **Database**: Store in PostgreSQL for complex queries
- **Cloud functions**: Use AWS Lambda/Google Cloud Functions for serverless execution

## 🛠️ Troubleshooting

### Common Issues

#### 1. "Connection timeout" errors
```bash
# Solution: Increase timeout
python run_etl.py --timeout 60
```

#### 2. "No CSV link found"
```bash
# Solution: ETL will automatically use fallback sources
# Check logs for which source was used
```

#### 3. "Rate limit exceeded"
```bash
# Solution: Increase delay between requests
# Edit nse_data_etl.py: time.sleep(0.5)  # Increase from 0.2
```

#### 4. "Empty news results"
```bash
# Solution: Check RSS feed URLs are accessible
curl "https://nsearchives.nseindia.com/content/RSS/Financial_Results.xml"
```

### Debug Mode
```python
# Enable debug logging
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 📚 API Reference

### NSEDataETL Class

#### Methods
- `fetch_constituents()` → `pd.DataFrame`: Get index constituents
- `fetch_news_for_symbol(symbol, limit=5)` → `List[Dict]`: Get news for symbol
- `build_complete_dataset()` → `pd.DataFrame`: Build full dataset
- `export_to_csv(filename=None)` → `str`: Export to CSV
- `export_to_json(filename=None)` → `str`: Export to JSON

#### Properties
- `headers`: HTTP headers for requests
- `nse_rss_feeds`: List of RSS feed URLs
- `base_url`: NSE base URL
- `fallback_url`: Backup data source

## 🔗 Related Files

- **Frontend**: `src/components/LiveMultibaggerAnalysis.tsx`
- **Data Provider**: `src/lib/nseDataProvider.ts`
- **Original Analysis**: `src/components/MultibaggerAnalysis.tsx`

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review logs for error details
3. Test with `--limit 5` for faster debugging
4. Verify network connectivity to NSE sites

## 📄 License

This ETL system is part of the FinSight trading application and follows the same licensing terms.
