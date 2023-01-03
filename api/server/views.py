from flask import Flask, Blueprint, request, jsonify, json
from . import db
from .models.Product import Product
from .models.Shoppinglist import Shoppinglist

views = Blueprint('views', __name__)

@views.route('/')
def default():
    return 'Welcome back'

@views.route('/products')
def products():
    return Product.get_products()

@views.route('/products/<int:id>')
def one_products(id):
    try:
        return {'200' : Product.get_one_product(id)}
    except Exception as error:
        return {'message' : f'Error: {error}'}

@views.route('/price', methods=['POST'])
def get_price():
    data = json.loads(request.data)
    print(data)
    total = Shoppinglist.get_price_by_supermarket(data['shopping'], data['supermarket'])
    print(total)
    return {'total':total}
    
@views.route('/nearby', methods=['POST'])
def get_nearby():
    data = json.loads(request.data)
    print(data)
    total = Shoppinglist.get_price_by_nearby_supermarket(data['shopping'], '86.7.250.38')
    print(total)
    return {'total':total}
    

@views.route('/test')
def test():
    temp = ["data1", "data2"]
    return temp

@views.route('/test2', methods=['GET', 'POST'])
def test2():
    data = { "name": 'ana', "email": "annah@gmail.com", "password": "password" }

    # if request.method == 'POST':
    return jsonify(data)
