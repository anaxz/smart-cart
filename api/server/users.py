from flask import Flask, Blueprint, request
from flask_login import login_required
from werkzeug.security import generate_password_hash, check_password_hash

from .models.User import User
from .models.Shoppinglist import Shoppinglist

users = Blueprint('users', __name__)

@users.route('/users/<int:id>', methods=['GET', 'POST'])
@login_required
def updateUser(id):
    user = User.get_user(id)

    if request.method == 'GET':
        try:
            return (user.name).json(), 200
        except:
            return 'Issue retreiving your name', 404

    elif request.method == 'POST':
        user.name = request.form['name']
        old_pass = request.form['old password']
        new_pass = request.form['new password']
        repeat_pass = request.form['repeat password']

        try:
            if not check_password_hash(user.password, old_pass):
                return 'Old password incorrect', 404
            elif new_pass != repeat_pass:
                return 'New password not the same', 404
            else:
                user.password = generate_password_hash(new_pass, method='sha256')
                User.update_user(user)
                return ('Successfully updated'), 204

        except Exception as error:
            return f'Fail to update. Error: {error}'

@users.route('/users/<int:id>')
@login_required
def delete(id):
    try: 
        user = User.get_user(id)
        User.delete_user(user.id)
        return ('User deleted'), 204

    except Exception as error:
        return f'Cannot delete user. Error: {error}'

@users.route('/users/<int:id>/favs', methods=['GET', 'POST'])
@login_required
def fav(id):
    if request.method == 'GET':
        try:
            fav = User.get_favourites(id)
            return fav.json()
        except Exception as error:
            return f"Cannot get user's favourites. Error: {error}"

    elif request.method == 'POST':
        try:
            pass

        except Exception as error:
            return f"Cannot update user's favourites. Error: {error}"


@users.route('/users/<int:id>/shopping-list', methods=['GET', 'POST'])
@login_required
def shoplist(id):
    if request.method == 'GET':
        try:
            data = Shoppinglist.get_list(id)
            return data.json(), 200
        except Exception as error:
            return f"Cannot get user's shopping list. Error: {error}"

@users.route('/users/<int:id>/all-shoplist', methods=['GET', 'POST'])
@login_required
def all_shoplist(id):
    if request.method == 'GET':
        try:
            data = Shoppinglist.get_all_lists(id)
            return data.json(), 200
        except Exception as error:
                return f"Cannot get all of user's shopping list. Error: {error}"