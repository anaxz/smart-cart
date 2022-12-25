from flask import Flask, Blueprint, request
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from .models.User import User

auth = Blueprint('auth', __name__)

@auth.route('/login',  methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        # user = User.query.filter_by(email=email).first()
        user = User.get_user(email)
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=True)
                print('login succesfully')
                return 200

            else:
                print('Incorrect password, try again.')
                return 403
        else:
            print('Email does not exist.')
            return 404

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    print('logout successfull')
    return 200

@auth.route('/signup', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        # user = User.query.filter_by(email=email).first()
        user = User.get_user(email)
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
            password = generate_password_hash(password1, method='sha256')
            new_user = User(name, email, password)

            response = User.add_user(new_user)
            login_user(new_user, remember=True)
            print('Account created!')
            return 201

    print("render sign_up.html")
    user=current_user
    return user, 200