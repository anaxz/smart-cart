from flask import Flask, Blueprint, request, json
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from .models.User import User

auth = Blueprint('auth', __name__)

@auth.route('/login',  methods=['POST'])
def login():
    if request.method == 'POST':
        request_data = json.loads(request.data)

        try: 
            user = User.get_user(request_data['email'])
            if user:
                if check_password_hash(user.password, request_data['password']):
                    login_user(user, remember=True)
                    return {'200' : 'Login successfull.'}
                else:
                    return {'403' : 'Incorrect password, try again.'}
        except Exception as error:
            return {'message' : f'Error: {error}'}

    # user=current_user
    # return {'200' : user }

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return {'200' : 'Logout successfull.'}

@auth.route('/signup', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        request_data = json.loads(request.data)
        email = request_data['email']
        name = request_data['name']
        password = request_data['password']

        try:
            user = User.get_user(email)
            hashed_password = generate_password_hash(password, method='sha256')

            print('add new user..')
            user = User(name, email, hashed_password)
            data = { name, email, hashed_password }

            User.add_user(data)
            login_user(user, remember=True)
            return {'201' : 'Account created!'}
        except Exception as error:
            return {'message' : f'Error: {error}'}

    # user=current_user 
    # return {'200' : user}