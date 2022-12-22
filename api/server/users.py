from flask import Flask, Blueprint, render_template

users = Blueprint('users', __name__)

@users.route('/users')
def default():
    return 'user routes'