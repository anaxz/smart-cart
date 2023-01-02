from flask import Flask, Blueprint, request, jsonify
from . import db

views = Blueprint('views', __name__)

@views.route('/')
def default():
    return 'Welcome back'

@views.route('/test')
def test():
    temp = ["data1", "data2"]
    return temp

@views.route('/test2', methods=['GET', 'POST'])
def test2():
    data = { "name": 'ana', "email": "annah@gmail.com", "password": "password" }

    # if request.method == 'POST':
    return jsonify(data)
