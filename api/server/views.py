from flask import Flask, Blueprint, request, jsonify, json, send_from_directory, render_template
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

@views.route('/products/<string:name>')
def products_by_name(name):
    try:
        return {'200' : Product.get_all_product(name)}
    except Exception as error:
        return {'message' : f'Error: {error}'}

@views.route('/price', methods=['POST'])
def get_price():
    data = json.loads(request.data)
    print(data)
    results = Shoppinglist.get_price_by_supermarket(data['shopping'], data['supermarket'])
    print(results)
    return {'total':results}
    
@views.route('/nearby', methods=['POST'])
def get_nearby():
    data = json.loads(request.data)
    print(data)
    results = Shoppinglist.get_price_by_nearby_supermarket(data['shopping'], data['ip'])
    print(results)
    return {'total':results}
    
@views.route('/top', methods=['POST'])
def get_top_prices():
    data = json.loads(request.data)
    print(data)
    results = Shoppinglist.get_price_by_top_supermarkets(data['shopping'])
    # print('Before')
    # print(results)
    return results

@views.route('/savelist', methods=['POST'])
def save_list():
    data = json.loads(request.data)
    print(data)
    results = Shoppinglist.save_list(data)
    print('Before')
    print(results)
    return 'List is saved'

@views.route('/react')
def react():
    return render_template('index.html')

