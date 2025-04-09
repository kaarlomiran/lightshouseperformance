import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Load the dataset (replace with your file path)
file_path = "ACS_MD_15_5YR_DP03.csv"  # Update this with the path to your CSV file
# data = pd.read_csv(data = pd.read_csv("Users/kaarlomiranda/lighthouse-performance-baseline/pythonproj/venv/lib/python3.13"))
#data = pd.read_csv("Users/kaarlomiranda/lighthouse-performance-baseline/pythonproj/ACS_MD_15_5YR_DP03.csv")
data = pd.read_csv("/Users/kaarlomiranda/lighthouse-performance-baseline/pythonproj/ACS_MD_15_5YR_DP03.csv")
# Inspect the data to understand its structure
print(data.head())
print(data.columns)

# Select numerical columns as features and target (adjust column names as needed)
data = data[["HC01_VC03", "HC03_VC04"]].dropna()

# Features (X) and target (y)
X = data[["HC01_VC03"]]  # Replace with a meaningful feature
y = data["HC03_VC04"]    # Replace with the target variable

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Print model coefficients and intercept
print("Model Coefficients:", model.coef_)
print("Model Intercept:", model.intercept_)

# Evaluate the model
print("Model Score (R^2):", model.score(X_test, y_test))

# Generate scatter plot
plt.figure(figsize=(8, 6))
plt.scatter(y_test, y_pred, alpha=0.6, label="Predicted vs Actual")
plt.xlabel("Actual Values")
plt.ylabel("Predicted Values")
plt.title("Actual vs Predicted Values (Scatter Plot)")
plt.legend()
plt.show()

# Generate trend line plot
plt.figure(figsize=(8, 6))
plt.plot(X_test, y_test, 'o', label="Actual Values", alpha=0.6)
plt.plot(X_test, y_pred, 'x', label="Predicted Values", color='red')
plt.xlabel("Feature (e.g., Population)")
plt.ylabel("Target (e.g., Percentage)")
plt.title("Actual vs Predicted Values (Trend Line)")
plt.legend()
plt.show()

plt.bar(X_test.values.flatten(), y_pred, alpha=0.5, label="Predicted")
plt.bar(X_test.values.flatten(), y_test, alpha=0.5, label="Actual")
plt.legend()
plt.xlabel("Feature")
plt.ylabel("Target")
plt.title("Bar Chart of Actual vs Predicted")
plt.show()

plt.hist(y_test - y_pred, bins=20, alpha=0.7)
plt.title("Residuals Histogram")
plt.xlabel("Prediction Error")
plt.ylabel("Frequency")
plt.show()

