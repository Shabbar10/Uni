import pandas as pd

df = pd.read_csv("./EurosFinal2024-Spain v England.csv")

print(df.ndim, '\n')
print(df.shape, '\n')
print(df.info(), '\n')
print(df.describe(), '\n')
print(df.isnull().values.any(), '\n')
print(df.head(), '\n')
print(df.tail(), '\n')

df.fillna(10, inplace=True)
print(df.head(), '\n')
print(df.tail(), '\n')
print(df.isnull().values.any(), '\n')
