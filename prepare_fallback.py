import pandas as pd
import json

df = pd.read_csv("Bengaluru_House_Data_Cleaned (2).csv")

# Ensure total_sqft is numeric and positive
df['total_sqft'] = pd.to_numeric(df['total_sqft'], errors='coerce')
df = df[df['total_sqft'] > 0]

# Calculate price per sqft
df['price_per_sqft'] = (df['price'] * 100000) / df['total_sqft']

# Group by location and BHK
agg = df.groupby(['location', 'BHK'])['price_per_sqft'].mean().reset_index()

fallback_data = {}
for _, row in agg.iterrows():
    loc = str(row['location']).strip()
    bhk = str(int(row['BHK'])) if pd.notna(row['BHK']) else "2"
    pps = row['price_per_sqft']
    
    if loc not in fallback_data:
        fallback_data[loc] = {}
    fallback_data[loc][bhk] = float(pps)

# add a global average
global_avg = df['price_per_sqft'].mean()
fallback_data['_global_avg'] = float(global_avg)
fallback_data['_city_avg_bhk'] = df.groupby('BHK')['price_per_sqft'].mean().to_dict()

with open('frontend/src/assets/fallback_data.json', 'w') as f:
    json.dump(fallback_data, f)

# Update locations.json
unique_locations = sorted([str(x).strip() for x in df['location'].dropna().unique()])
with open('frontend/src/assets/locations.json', 'w') as f:
    json.dump(unique_locations, f)

print("✅ Fallback data and locations updated successfully!")
