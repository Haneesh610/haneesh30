from django.shortcuts import render
import pandas as pd
from django.http import HttpResponse
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Create your views here.
def home(request):
    return render(request,'home.html')

def predict(request):
    return render(request,'predict.html')

def about(request):
    return render(request,'about.html')

def contact(request):
    return render(request,'contact.html')

def result(request):
    data = pd.read_csv('PredictionApp/diabetes.csv')

    X = data.drop(columns='Outcome', axis=1)
    Y = data['Outcome']
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2)

    model = LogisticRegression()
    model.fit(X_train, Y_train)

    # Get input values from the request
    input_values = []
    for i in range(1, 9):
        value = request.GET.get(f'n{i}', '')
        if value == '':
            return HttpResponse(f"Error: All fields must be filled out. Missing value for n{i}.")
        try:
            val = float(value)
            if val < 0:
                return HttpResponse(f"Error: Invalid input for n{i}. Value cannot be negative.")
            input_values.append(val)
        except ValueError:
            return HttpResponse(f"Error: Invalid input for n{i}. Must be a number.")

    # Predict the outcome
    pred = model.predict([input_values])

    # Determine the result
    result1 = 'You are Diabetic' if pred == [1] else 'You are Not Diabetic'

    return render(request, 'predict.html', {'result2': result1})