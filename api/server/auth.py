from flask import Flask, Blueprint, request
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from .models import User

auth = Blueprint('auth', __name__)

@auth.route('/login',  methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
                return print('render views.home')
            else:
                print('Incorrect password, try again.')
        else:
            print('Email does not exist.')

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return print('render auth.login')

@auth.route('/signup', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(email=email).first()
        if user:
            print('Email already exists.')
        elif len(email) < 4:
            print('Email must be greater than 3 characters.')
        elif len(name) < 2:
            print('First name must be greater than 1 character.')
        elif password1 != password2:
            print('Passwords don\'t match.')
        elif len(password1) < 7:
            print('Password must be at least 7 characters.')
        else:
            #sha256 -> hashing algorithm type
            new_user = User(email=email, password=generate_password_hash(
                password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()

            login_user(new_user, remember=True)
            print('Account created!')
            return print('views.home')

    print("render sign_up.html")
    user=current_user
    return user