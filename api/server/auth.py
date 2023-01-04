from flask import Blueprint, request, json
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
            print(user)

            if user:
                if check_password_hash(user[3], request_data['password']):
                    # login_user(user, remember=True)
                    print('Login successful.')
                    return {'200' : user[0]}
                else:
                    print('Incorrect password')
                    return {'403' : 'Incorrect password, try again.'}
            
        except Exception as error:
            return {'message' : f'Error: {error}'}

    # user=current_user
    # return {'200' : user }

@auth.route('/logout')
@login_required
def logout():
    try:
        logout_user()
        return {'200' : 'Logout successfull.'}
    except Exception as error:
        return {'message' : f'Error: {error}'}

def get_user(email):
    try:
        user = User.get_user(email)
        print('test')
        print(user)
        return user
    except:
        return False

@auth.route('/signup', methods=['POST'])
def sign_up():
    if request.method == 'POST':
        request_data = json.loads(request.data)
        email = request_data['email']
        name = request_data['name']
        password = request_data['password']

        print(email)

        try:
            response = get_user(email)
            print('Test')
            print(response)

            if response != False:
                hashed_password = generate_password_hash(password, method='sha256')

                print('add new user..')
                user = User(name, email, hashed_password)
                data = {'name': name, 'email': email, 'password': hashed_password }
                print(data)
                id = User.add_user(data)
                print(data)
                # login_user(user, remember=True)
                return {'201' : id}
            else:
                return {'404' : 'Email already exists!'}
        except Exception as error:
            return {'message' : f'Error: {error}'}

    # user=current_user 
    # return {'200' : user}