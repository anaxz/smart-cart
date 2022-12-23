from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from .models import User
# from .temp

users = Blueprint('users', __name__)

@users.route('/users/<int:id>', methods=['GET', 'POST'])
@login_required
def updateUser(id):
    user = User.query.get_or_404(id)
    # query = (f"SELECT name FROM User WHERE id = {id}")

    if request.method == 'GET':
        try:
            return user.name
        except:
            return 'Issue retreiving your name'

    elif request.method == 'POST':
        user.name = request.form['name']
        old_pass = request.form['old password']
        new_pass = request.form['new password']
        repeat_pass = request.form['repeat password']

        try:
            if not check_password_hash(user.password, old_pass):
                return 'Old password incorrect'
            elif new_pass != repeat_pass:
                return 'New password not the same'
            else:
                user.password = generate_password_hash(new_pass, method='sha256')
                # db.session.update(User).where(User.id == user.id).values(user.password)
                db.session.commit()
                return print('Successfully updated')
        except Exception as error:
            return f'Fail to update. Error: {error}'

@users.route('/users/<int:id>')
@login_required
def delete(id):
    user = User.query.get_or_404(id)

    try: 
        db.session.delete(user)
        db.session.commit()
        return 'User deleted'
    except Exception as error:
        return f'Cannot delete user. Error: {error}'

@users.route('/users/<int:id>/favs', methods=['GET', 'POST'])
@login_required
def get_fav(id):
    if request.method == 'GET':
        try:
            # get all fav products
            fav = Fav.get(id)
            return fav
        except Exception as error:
            return f"Cannot get user's favourites. Error: {error}"


@users.route('/users/<int:id>/shopping-list', methods=['GET', 'POST'])
def get_shoplist(id):
    pass

@users.route('/users/<int:id>/users-shoplist', methods=['GET', 'POST'])
def get_all_shoplist(id):
    pass