from ninja import Schema,ModelSchema
from decimal import Decimal
from datetime import datetime
from typing import Optional
from .models import *

from ninja import Schema

class UserRegisterSchema(Schema):
    username: str
    email: str
    password: str
    confirm_password: str  
class LoginSchema(Schema):
    username: str
    password: str

class TokenSchema(Schema):
    access_token: str
    token_type: str = 'bearer'

class messageSchema(Schema):
    message: str
    
class PaymentSchema(Schema):
    amount: float
    currency: str = "USDT"
    payment_method: str 
    order_id: int

class PaymentResponseSchema(Schema):
    status: str
    message: str
    transaction_id: Optional[str] = None
    
   
class UserProfileSchema(Schema):
    full_name: str
    username: str
    
    
class TTSSchema(Schema):
    text: str = None
    
    
class UserDeliverySchema(Schema):
    full_name : str = ""
    phone_number: int = ""
    email: str = ""
    street: str =""
    city :str =""
    contury: str  = ""
    
    
from decimal import Decimal
from datetime import datetime
from typing import Optional


class PostResponseSchema(Schema):
    id: int
    name: Optional[str] = None
    price: Decimal
    description: str
    image: str  # This will return the URL string
    create_to: datetime