from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

DB_NAME = "database.db"


def create_app():
    app = Flask(__name__, static_folder='../client/dist', static_url_path='/')
    CORS(app)

    # db = SQLAlchemy(app)
    # app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    # db.init_app(app)

    from .views import views
    from .users import users

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(users, url_prefix='/')

    return app
