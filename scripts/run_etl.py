#!/usr/bin/env python3
"""
Simple runner script for the NSE Data ETL process
Usage: python run_etl.py [--format csv|json|both] [--output filename]
"""

import argparse
import sys
import os
from datetime import datetime
from nse_data_etl import NSEDataETL

def main():
    parser = argparse.ArgumentParser(description='Run NSE Data ETL for Multibagger Analysis')
    parser.add_argument('--format', choices=['csv', 'json', 'both'], default='both',
                       help='Output format (default: both)')
    parser.add_argument('--output', type=str, help='Output filename (without extension)')
    parser.add_argument('--limit', type=int, default=None, help='Limit number of symbols to process')
    
    args = parser.parse_args()
    
    print("🚀 Starting NSE Data ETL Process...")
    print(f"📅 Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"📊 Output format: {args.format}")
    
    try:
        etl = NSEDataETL()
        
        # Build dataset
        print("📈 Fetching index constituents...")
        df = etl.build_complete_dataset()
        
        # Apply limit if specified
        if args.limit:
            df = df.head(args.limit)
            print(f"🔢 Limited to {args.limit} symbols")
        
        # Generate filenames
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base_filename = args.output or f"nifty_smallcap_momentum_data_{timestamp}"
        
        files_created = []
        
        # Export based on format
        if args.format in ['csv', 'both']:
            csv_file = f"{base_filename}.csv"
            df.to_csv(csv_file, index=False)
            files_created.append(csv_file)
            print(f"✅ CSV exported: {csv_file}")
        
        if args.format in ['json', 'both']:
            json_file = f"{base_filename}.json"
            df.to_json(json_file, orient='records', indent=2)
            files_created.append(json_file)
            print(f"✅ JSON exported: {json_file}")
        
        # Print summary
        print("\n📋 Dataset Summary:")
        print(f"   📊 Total symbols: {len(df)}")
        print(f"   📰 Symbols with news: {len(df[df['news_titles'] != ''])}")
        print(f"   📅 Data fetch date: {df['data_fetch_date'].iloc[0]}")
        
        if len(df) > 0:
            print(f"   🔝 Sample symbols: {', '.join(df['symbol'].head(5).tolist())}")
        
        print(f"\n🎉 ETL Process Completed Successfully!")
        print(f"📁 Files created: {', '.join(files_created)}")
        
        # Instructions for next steps
        print("\n📝 Next Steps:")
        print("   1. Review the generated data files")
        print("   2. Use the data with your multibagger scoring framework")
        print("   3. Set up automated runs with cron or scheduler")
        print("   4. Integrate with your React frontend")
        
    except Exception as e:
        print(f"❌ ETL Process Failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
