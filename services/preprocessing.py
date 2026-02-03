import numpy as np

def build_lstm_sequence(data: np.ndarray, lookback: int) -> np.ndarray:
    sequences = []
    for i in range(len(data) - lookback):
        sequences.append(data[i:i + lookback])
    return np.array(sequences)
