from flask import Flask, Blueprint, request, json
from flask_login import login_required
from werkzeug.security import generate_password_hash, check_password_hash

from .models.User import User
from .models.Shoppinglist import Shoppinglist

users = Blueprint('users', __name__)

@users.route('/<int:id>', methods=['GET', 'POST'])
@login_required
def getUser(id):
    user = User.get_user_by_id(id)

    try:
        return {'name' : user.name}, 200
    except:
        return {'404' : 'Issue retreiving your name'}

@users.route('/<int:id>', methods=['GET', 'POST'])
@login_required
def updateUser(id):
    user = User.get_user_by_id(id)

    if request.method == 'POST':
        try:
            request_data = json.loads(request.data)
            if not check_password_hash(user.password, request_data['old password']):
                return 'Old password incorrect', 404
            else:
                user.password = generate_password_hash(request_data['new password'], method='sha256')
                User.update_user(user)
                return {'204' : 'Successfully updated'}

        except Exception as error:
            return {'message' : f'Fail to update. Error: {error}'}

@users.route('/<int:id>')
@login_required
def delete(id):
    try: 
        user = User.get_user(id)
        User.delete_user(user.id)
        return {'204' : 'User deleted'}

    except Exception as error:
        return {'message' : f'Cannot delete user. Error: {error}'}

@users.route('/<int:user_id>/favs', methods=['GET', 'POST'])
@login_required
def fav(user_id):
    list_favs = User.get_favourites(user_id)

    if request.method == 'GET':
        try:
            return {'200' : list_favs}
        except Exception as error:
            return {'message' : f"Cannot get user's favourites. Error: {error}"}

    # elif request.method == 'POST':
    #     try:
    #         request_data = json.loads(request.data)
    #         User.add_favourites(request_data)
    #         return {'204' : 'Successfully updated'}

    #     except Exception as error:
    #         return {'message' : f"Cannot update user's favourites. Error: {error}"}

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