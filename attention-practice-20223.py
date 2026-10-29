import numpy as np

VOCAB_SIZE = 10
EMBED_DIM = 16

W_emb = np.random.randn(VOCAB_SIZE, EMBED_DIM)

print(W_emb)