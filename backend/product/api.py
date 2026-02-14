from ninja.security import django_auth
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from ninja import NinjaAPI, File, Form, UploadedFile
from .models import Post as PostModel
from django.shortcuts import get_object_or_404
from .schema import UserRegisterSchema, LoginSchema, messageSchema, PaymentSchema, PaymentResponseSchema, UserProfileSchema,  PostResponseSchema,  UserDeliverySchema
from ninja.errors import HttpError
from typing import List







api = NinjaAPI(title="E-commerce API", urls_namespace="api_v1")

@api.post("/auth/register", response={201: messageSchema, 400: messageSchema})
def register_user(request, data: UserRegisterSchema):
    if data.password != data.confirm_password:
        return 400, {"message": "Passwords do not match"}

    if User.objects.filter(username=data.username).exists():
        return 400, {"message": "Username already taken"}

    user = User.objects.create_user(
        username=data.username,
        email=data.email,
        password=data.password
    )
    return 201, {"message": "User registered successfully"}

@api.post("/auth/login", response={200: messageSchema, 401: messageSchema})
def login_user(request, data: LoginSchema):
    user = authenticate(username=data.username, password=data.password)
    
    if user is not None:
        login(request, user)
        return 200, {"message": "Login successful"}
    else:
        return 401, {"message": "Invalid username or password"}
    
    

@api.post("/payment/checkout", response={200: PaymentResponseSchema, 400: messageSchema})
def process_payment(request, data: PaymentSchema):
  
    if not request.user.is_authenticated:
        return 401, {"message": "Unauthorized"}

    if data.payment_method == "bank_transfer":
        return 200, {
            "status": "pending",
            "message": "Please transfer the amount to: Bank Name: XYZ, Acct: 123456789. Use Order ID as reference.",
            "transaction_id": f"BT-{data.order_id}"
        }
    
    elif data.payment_method == "stripe":
        return 200, {"status": "processing", "message": "Redirecting to gateway..."}
    return 400, {"message": "Unsupported payment method"}

@api.post("/payment/checkout", response={200: PaymentResponseSchema, 400: messageSchema, 401: messageSchema})
def checkout_payment_process(request, data: PaymentSchema):
    if not request.user.is_authenticated:
        return 401, {"message": "Please log in first"}

    try:
     
        return 200, {"status": "success", "message": "Logic here"}
    except Exception as e:
        return 400, {"message": str(e)}

#User Profile (For the Top Bar) ---

@api.get("/auth/me", response={200: UserProfileSchema, 401: messageSchema}, auth=django_auth)
def get_user_profile(request):
    """
    Returns the user's name to be displayed at the top of the app.
    """
    user = request.user
    
    # Logic to show full name or fallback to username
    full_name = f"{user.first_name} {user.last_name}".strip() or user.username
    
    return 200, {
        "full_name": full_name,
        "username": user.username
    }
    


@api.post("/delivery-info")
def post_delivery_info(request, data: UserDeliverySchema):
    print(data.dict()) 
    return {"message": "Delivery information saved successfully!", "user": data.full_name}


@api.get("/posts", response=List[PostResponseSchema])
def list_posts(request):
    return PostModel.objects.all()

@api.post("/posts", response={201: PostResponseSchema})
def create_post(
    request, 
    id: int = Form(...), 
    name: str = Form(...), 
    price: float = Form(...), 
    description: str = Form(...), 
    image: UploadedFile = File(...)
):
    # First, check if the ID already exists to avoid the IntegrityError
    if PostModel.objects.filter(id=id).exists():
        
        raise HttpError(409, f"Post with ID {id} already exists.")

    new_post = PostModel.objects.create(
        id=id,
        name=name,
        price=price,
        description=description,
        image=image
    )
    return 201, new_post