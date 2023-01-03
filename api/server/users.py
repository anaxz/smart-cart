from flask import Blueprint, request, json
from flask_login import login_required
from werkzeug.security import generate_password_hash, check_password_hash

from .models.User import User
from .models.Shoppinglist import Shoppinglist

users = Blueprint('users', __name__)




@users.route('/<int:id>', methods=['GET'])
@login_required
def get_user(id):
    try:
        user = User.get_user_by_id(id)
        return {'200' : user}
    except:
        return {'404' : 'Issue retreiving user'}

# @users.route('/')
# def get_all_users():
#     try:
#         users = User.get_all_users()
#         return {'200' : users}
#     except:
#         return {'404' : 'Issue retreiving users'}

@users.route('/<int:id>', methods=['POST'])
@login_required
def update_user(id):
    user = User.get_user_by_id(id)

    if request.method == 'POST':
        try:
            request_data = json.loads(request.data)
            email = request_data['email']
            name = request_data['name']
            old_password = request_data['old password']
            new_password = request_data['new password']

            print('db user - pass')
            print(user[3])
            print(old_password)

            if(user[3] != old_password):
                print('not correct pass')
                return {'404' : 'Old password incorrect'}
            else:
                hashed_password = generate_password_hash(new_password, method='sha256')
                print('hash password generated')
                data = {'id': user[0],'name': name, 'email': email, 'password': hashed_password }
                User.update_user(data)
                return {'204' : 'Successfully updated'}

        except Exception as error:
            return {'message' : f'Fail to update. Error: {error}'}

@users.route('/<int:id>')
@login_required
def delete(id):
    try: 
        user = User.get_user_by_id(id)
        User.delete_user(user[0])
        return {'204' : 'User deleted'}

    except Exception as error:
        return {'message' : f'Cannot delete user. Error: {error}'}

@users.route('/<int:user_id>/favs', methods=['GET', 'POST'])
@login_required
def fav(user_id):
    list_favs = User.get_favourites(user_id)

    print('list_favs')
    print(list_favs)

    if request.method == 'GET':
        try:
            return {'200' : list_favs}
        except Exception as error:
            return {'message' : f"Cannot get user's favourites. Error: {error}"}

    elif request.method == 'POST':
        try:
            request_data = json.loads(request.data)
            User.add_favourites(request_data)
            return {'204' : 'Successfully updated'}

        except Exception as error:
            return {'message' : f"Cannot update user's favourites. Error: {error}"}

@users.route('/<int:id>/shopping-list', methods=['GET', 'POST'])
@login_required
def shoplist(id):
    if request.method == 'GET':
        try:
            data = Shoppinglist.get_list(id)
            return {'200' : data}
        except Exception as error:
            return {'message' : f"Cannot get user's shopping list. Error: {error}"}

@users.route('/<int:id>/all-shoplist', methods=['GET', 'POST'])
@login_required
def all_shoplist(id):
    if request.method == 'GET':
        try:
            data = Shoppinglist.get_all_lists(id)
            return {'200' : data}
        except Exception as error:
                return {'message' : f"Cannot get all of user's shopping list. Error: {error}"}