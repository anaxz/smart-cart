from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

from os import path
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

DB_URL = os.environ.get("DATABASE_URL")

db = SQLAlchemy()
DB_NAME = "smart-cart.db"


def create_app():
    app = Flask(__name__, static_folder='../client/dist', static_url_path='/')
    CORS(app)

    # app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
    # app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    # db.init_app(app)

    from .views import views
    from .users import users
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(users, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User

    # create_database(app)

    #this has to be below db creation
    login_manager = LoginManager()
    #if not logged, redirect users to here
    #name of templ & func / auth file login func
    login_manager.login_view = 'auth.login' 
    login_manager.init_app(app)

    return app

# if db not created, create it
def create_database(app):
    if not path.exists('./server/instance/' + DB_NAME):
        with app.app_context():
            db.create_all()
        print('Created Database!')