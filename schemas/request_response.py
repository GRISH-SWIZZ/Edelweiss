from pydantic import BaseModel
from typing import List


class PredictionRequest(BaseModel):
    symbol: str
    lookback: int = 60


class PriceBlock(BaseModel):
    last_close: float
    predicted: float
    change_pct: float


class ConfidenceBlock(BaseModel):
    score: float
    level: str


class PatternMemoryBlock(BaseModel):
    pattern_name: str
    similarity: float
    last_seen: str


class MarketMoodBlock(BaseModel):
    state: str
    confidence: float


class RiskBlock(BaseModel):
    level: str
    volatility: float


class AnomalyBlock(BaseModel):
    status: str
    severity: float


class ExplainabilityItem(BaseModel):
    feature: str
    impact: float


class ModelBlock(BaseModel):
    version: str


class PredictionResponse(BaseModel):
    symbol: str
    price: PriceBlock
    confidence: ConfidenceBlock
    pattern_memory: PatternMemoryBlock
    market_mood: MarketMoodBlock
    risk: RiskBlock
    anomaly: AnomalyBlock
    explainability: List[ExplainabilityItem]
    model: ModelBlock
