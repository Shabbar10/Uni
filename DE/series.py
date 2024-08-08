import pandas as pd

# name, height, gender, roll_no
'''
[
    dict1 = {},
    dict2 = {}
]
'''
data = {
    'name': ['Athurv', 'Apurv', 'Cooldude'],
    'roll_no': [37, 44, 51],
    'gender': ['M', 'M', 'T'],
}

df = pd.DataFrame(data)

print(df)

df['height'] = [176, 176, 100]
print(df)

df.loc[len(df)] = ['Shabbar', 57, 'M', 176]
print(df)

print(df.drop('height', axis=1))

print(df.drop(2))

df.insert(loc=2, column='country', value=['India', 'India', 'India', 'Tz'])
print(df)

