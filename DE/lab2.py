import pandas as pd
import numpy as np

table = {
    'name': ['James', 'Barra', 'Sarah', 'Bill', 'Peter', 'Chloe', 'Ben', 'Anna'],
    'gender': ['M', 'M', 'F', 'M', 'M', 'F', 'M', 'F'],
    'age': [27, 32, 34, 23, 27, 32, 34, 23],
    'weight': [75.1, 98.3, 63.5, 87.2, 75.1, 98.3, 63.5, 87.2],
    'height': ['Short', 'Short', 'Medium', 'Tall', 'Short', 'Short', 'Medium', 'Tall']
}

df = pd.DataFrame(table)
print(df)

df = pd.DataFrame(df, columns=['name', 'gender', 'age', 'weight', 'height', 'marks'])
print(df)

print()

print(df['age'] > 25)
print(df['age'] ** 2)
print(df['age'] * 25)
print(np.exp(df['age']))
print(np.log(df['age']))

print()
print(df.columns)
print()
print(df.info())
print()
print(df.describe())
print()
print(df.dtypes)
print()
print(df.shape)
print()
print(df.ndim)
print()
print(df['age'].ndim)
print()
print(df.isnull())
print()
print(df.isnull().sum())
print()
print(df.isnull().values.any())

print()
print(df['marks'].isnull())

df.fillna(99, inplace=True)
print(df)

print(df.head())
print(df.head(3))
print(df.tail())
print(df.tail(3))

print()
print(df['weight'].median())
print(df['weight'].mean())
print(df['height'].mode())

df['new_col'] = [np.nan, 2, np.nan, 4, 5, np.nan, 7, 8]
print()

df.loc[len(df)] = ['Hamjit', 'M', 22, 70.2, 'Short', np.nan, 9]
df.loc[len(df)] = ['Hamjit', 'M', 22, 70.2, 'Short', np.nan, 9]

print(df)

print(df.duplicated(keep='first'))
print(df.duplicated(keep='last'))
print(df.duplicated(keep=False))

print(df.duplicated(subset='age', keep='first'))
print(df.duplicated(subset='name', keep='first'))

