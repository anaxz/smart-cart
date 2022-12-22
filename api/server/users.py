from flask import Flask, Blueprint, render_template
from . import db

users = Blueprint('users', __name__)

@users.route('/users')
def default():
    return 'user routes'