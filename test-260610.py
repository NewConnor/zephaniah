from konlpy.tag import Okt

okt = Okt()

text = "장차 나라의 자랑이 될 아름다운 이여 그대의 심장이 영원히 비상하리라."

print("형태소:", okt.morphs(text))