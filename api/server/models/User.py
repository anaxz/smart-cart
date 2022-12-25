from flask_login import UserMixin
from ..temp import cur

class User():
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
        UserMixin

    def __repr__(self):
        return f"User {self.name}, {self.email}"

    def add_user(data):
        query = f"INSERT INTO Users (name, email, password) VALUES ('{data.name}', '{data.email}', '{data.password}')"
        cur.execute(query)
        response = cur.fetchall()
        new_user = User(data.name,data.email, data.password)
        print(response)
        return response

    def get_user(email):
        query = f"SELECT * FROM Users WHERE email = {email}"
        cur.execute(query)
        response = cur.fetchall()
        print(response)
        return response

    def update_user(data):
        query = f"UPDATE Users SET name={data.name} email={data.email} password={data.password} WHERE = {data.id}"
        cur.execute(query)
        response = cur.fetchall()
        return response

    def delete_user(id):
        query = f"DELETE FROM Users WHERE id = {id}"
        cur.execute(query)
        response = cur.fetchall()
        return response

    def get_favourites(id):
        query = f"SELECT * FROM Favourites WHERE user_id = {id}"
        cur.execute(query)
        response = cur.fetchall()
        return response