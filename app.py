from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas.request_response import PredictionRequest
from services.predictor import predict_stock

app = FastAPI(title="Edelweiss Intelligence API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "Edelweiss backend running"}


@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        return predict_stock(
            symbol=request.symbol,
            lookback=request.lookback
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
