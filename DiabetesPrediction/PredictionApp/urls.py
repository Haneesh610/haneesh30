from django.contrib import admin
from django.urls import path
from predictionapp import views
urlpatterns = [
   
    path('admin/',admin.site.urls),
    path('',views.home),
    path('home/',views.home),
    path('about/',views.about,name='about'),
    path('contact/',views.contact,name="contact"),
    path('predict/',views.predict,name='predict'),
    path('result/',views.result,name='result'),
    path('saveenquiry/',views.saveEnquiry,name='saveEnquiry'),
]
