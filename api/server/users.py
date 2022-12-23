from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from .models import User

users = Blueprint('users', __name__)

@users.route('/users/<int:id>', methods=['GET', 'POST'])
@login_required
def updateUser(id):
    user = User.query.get_or_404(id)

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
        except Exception:
            return Exception

@users.route('/users/<int:id>')
def delete(id):
    user = User.query.get_or_404(id)

    try: 
        db.session.delete(user)
        db.session.commit()
        return print('User deleted')
    except:
        return 'Issue deleting the task.'