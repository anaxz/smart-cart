from flask_login import UserMixin
from ..temp import cur, conn

class User(UserMixin):
    def __init__(self, name, email, password):
        self.id = ''
        self.name = name
        self.email = email
        self.password = password

    def __repr__(self):
        return f"User {self.name}, {self.email}"

    def update(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def add_user(data):
        query = f"INSERT INTO Users (name, email, password) VALUES ('{data['name']}', '{data['email']}', '{data['password']}');"
        cur.execute(query)
        conn.commit()
        print('Inserted')
        new_user = User(data['name'], data['email'], data['password'])
        print(new_user)
        return 'User Created'

    def get_user_by_id(id):
        query = f"SELECT * FROM Users WHERE id = {id};"
        print(query)
        cur.execute(query)
        print('get user by id')
        response = cur.fetchone()
        print(response)
        return response

    def get_user(email):
        query = f"SELECT email, password FROM Users WHERE email = '{email}';"
        print(query)
        cur.execute(query)
        response = cur.fetchone()
        print(response)
        return response

    def get_all_users():
        query = f"SELECT * FROM Users';"
        print(query)
        cur.execute(query)
        response = cur.fetchall()
        print(response)
        return response

    def update_user(data):
        print('--update_user')
        query = f"UPDATE Users SET name='{data['name']}', email='{data['email']}', password='{data['password']}' WHERE id = {data['id']};"
        print(query)
        cur.execute(query)
        conn.commit()
        print('committed')
        # User.update({data['name']}, {data['email']}, {data['password']})
        return 'Updated User'

    def delete_user(id):
        query = f"DELETE FROM Users WHERE id = {id};"
        cur.execute(query)
        conn.commit()
        return 'Deleted user'

    def get_favourites(id):
        query = f"SELECT * FROM Favourites WHERE user_id = {id};"
        cur.execute(query)
        response = cur.fetchall()
        print(response)
        return response

    def add_favourites(data):
        query = f"INSERT INTO Favourites (user_id, product_id) VALUES ({data['user_id']}, '{data['product_id']}');"
        cur.execute(query)
        conn.commit()
        return 'Add new Favourites'

    def delete_favourites(id):
        query = f"DELETE FROM Favourites WHERE product_id = {id};"
        cur.execute(query)
        conn.commit()
        return 'Deleted Favourites'