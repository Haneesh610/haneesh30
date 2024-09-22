from django.shortcuts import render,redirect
import pandas as pd
import csv
from django.http import HttpResponse
from django.contrib import messages
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from predictionapp.models import contactEnquiry

# Create your views here.
def home(request):
    return render(request,'home.html')

def predict(request):
    return render(request,'predict.html')

def about(request):
    return render(request,'about.html')

def contact(request):
    return render(request,'contact.html')

  
def saveEnquiry(request):
    if request.method == "POST":
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        message = request.POST.get('message')

        try:
            # Save enquiry
            enquiry = contactEnquiry(name=name, phone=phone, email=email, message=message)
            enquiry.save()
            messages.success(request, 'Your enquiry has been submitted successfully!')
        except Exception as e:
            messages.error(request, 'There was an error submitting your enquiry. Please try again later.')

        # return redirect('contact')  # Redirect to the contact page

    return render(request, 'contact.html')

def result(request):
    # Load your dataset
    data = pd.read_csv('PredictionApp/diabetes.csv')
    
    # Prepare data for training
    X = data.drop(columns='Outcome', axis=1)
    Y = data['Outcome']
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2)

    # Train the model
    model = LogisticRegression()
    model.fit(X_train, Y_train)

    # Get input values from the form
    input_values = []
    for i in range(1, 9):
        value = request.POST.get(f'n{i}', '')
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
    result1 = 'You are Diabetic' if pred == [1] else 'You are Not Diabetic'

    # Check which action was triggered
    action = request.POST.get('action')
    
    if action == 'show':
        # Show result on the page
        return render(request, 'predict.html', {'result2': result1})

    elif action == 'download':
        # Download result as CSV
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="prediction_result.csv"'

        writer = csv.writer(response)
        writer.writerow(['Name', 'Value'])
        writer.writerow(['Pregnancies', input_values[0]])
        writer.writerow(['Glucose', input_values[1]])
        writer.writerow(['Blood Pressure', input_values[2]])
        writer.writerow(['Skin Thickness', input_values[3]])
        writer.writerow(['Insulin', input_values[4]])
        writer.writerow(['BMI', input_values[5]])
        writer.writerow(['Diabetes Pedigree Function', input_values[6]])
        writer.writerow(['Age', input_values[7]])
        writer.writerow(['Prediction Result', result1])

        return response  



# haneesh 12345