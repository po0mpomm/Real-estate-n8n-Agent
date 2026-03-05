import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
import joblib

df = pd.read_csv("Bengaluru_House_Data_Cleaned (2).csv")
df['total_sqft_num'] = pd.to_numeric(df['total_sqft'], errors='coerce')
df.dropna(subset=['price', 'total_sqft_num', 'BHK', 'bath'], inplace=True)

# Location Bucketing (same as original script)
def bucket_location(s):
    s = s.strip().lower()
    return s

location_stats = df['location'].value_counts(ascending=False)
location_stats_less_than_10 = location_stats[location_stats<=10]

df['location_bucket'] = df['location'].apply(lambda x: "other" if x in location_stats_less_than_10 else x)

X = df[['total_sqft_num', 'bath', 'BHK', 'location_bucket']]
y = df['price']

numeric_features = ["total_sqft_num", "bath", "BHK"]
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_features = ["location_bucket"]
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='other')),
    ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Basic fast model
model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, max_depth=15, n_jobs=-1, random_state=42))
])

print("Training model...")
model.fit(X, y)

joblib.dump(model, 'bengaluru_price_model.joblib')
print("Model re-trained and saved to bengaluru_price_model.joblib using scikit-learn", joblib.__version__)
