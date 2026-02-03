import yfinance as yf
import pandas as pd

def fetch_stock_data(symbol: str, period: str = "2y") -> pd.DataFrame:
    df = yf.download(symbol, period=period, progress=False)

    if df is None or df.empty:
        raise ValueError(f"No data fetched for given symbol: {symbol}")

    df.reset_index(inplace=True)
    return df
