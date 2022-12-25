from flask import Flask, Blueprint, request, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from .models.User import User

auth = Blueprint('auth', __name__)

@auth.route('/login',  methods=['POST'])
def login():
    if request.method == 'POST':
        # email = request.form.get('email')
        # password = request.form.get('password')
        email = "anah12@gmail.com"

        try: 
            user = User.get_user(email)
            if user:
                if check_password_hash(user.password, "password"):
                    login_user(user, remember=True)
                    return 'login succesfully', 200
                else:
                    return 'Incorrect password, try again.', 403
        except:
            return 'Email does not exist.', 404

    user=current_user
    return user, 200

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return 'logout successfull', 200

@auth.route('/signup', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        # email = request.form.get('email')
        # name = request.form.get('name')
        # password1 = request.form.get('password1')
        # password2 = request.form.get('password2')
        name='aaaa'
        email = "anah12@gmail.com"
        password = "password1"

        try:
            user = User.get_user(email)
            if user:
                return ('Email already exists.'), 200
        except:
            hashed_password = generate_password_hash(password, method='sha256')

            print('add new user..')
            new_user = User(name, email, hashed_password)
            data = { name, email, hashed_password }

            response = User.add_user(data)
            login_user(new_user, remember=True)
            return 'Account created!', 201

    # user=current_user 
    # return user, 200