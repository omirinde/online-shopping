from django.db import models  

from django.contrib.auth.models import User

# Create your models here.
class Register(models.Model):
    name = models.CharField(max_length=150, null=False,)
    password = models.CharField(max_length=20, )
    data =  models.DateTimeField(auto_now_add=True)
    country = models.CharField(max_length=30)
 

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=400, null=True, blank=True)
    price = models.DecimalField(max_digits=20, decimal_places=3)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    create_to = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name if self.name else f"Post {self.id}"
    

    class Login(models.Model):
        name = models.CharField(max_length=150)
        password = models.CharField(max_length=30)
  
    class  Delivery(models.Model):
        full_name = models.CharField(max_length=150, null=True )
        phone_number = models.IntegerField(max_length=11)
        email = models.CharField(max_length=300, null=True)
        street = models.CharField(max_length=300, null=True)
        city = models.CharField(max_length=400, null= True)
        country = models.CharField(max_length=300, null=True) 
        
  
  
        

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('shipped', 'Shipped'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class Transaction(models.Model):
    METHOD_CHOICES = (
        ('bank_transfer', 'Bank Transfer'),
        ('credit_card', 'Credit Card'),
        ('paypal', 'PayPal'),
    )
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    transaction_id = models.CharField(max_length=100, unique=True)
    payment_method = models.CharField(max_length=50, choices=METHOD_CHOICES)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    proof_of_payment = models.FileField(upload_to='payment_proofs/', null=True, blank=True)
    verified = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transaction {self.transaction_id} for Order {self.order.id}"
    
    
