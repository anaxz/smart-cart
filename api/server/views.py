from flask import Flask, Blueprint, render_template
from . import db

views = Blueprint('views', __name__)

@views.route('/')
def default():
    return 'Welcome back'

@views.route('/test')
def test():
    temp = ["data1", "data2"]
    return temp

