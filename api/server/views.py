from flask import Flask, Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/')
def default():
    return 'Welcome back'

@views.route('/test')
def test():
    temp = ["data1", "data2"]
    return temp

