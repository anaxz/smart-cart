import os
import psycopg2

url = "postgres://admin:x3tGfygzNAP2JEOKGSHUMl1LOxQb4Ig9@dpg-ceirh32rrk0a7i0av6q0-a.frankfurt-postgres.render.com/smart_cart_kjou"

conn = psycopg2.connect(url)

cur = conn.cursor()
search = ' SELECT * FROM Users; '

def add_user(data):
    query = f"INSERT INTO Users (name, email, password) VALUES ('{data.name}', '{data.email}', '{data.password}')"
    cur.execute(query)
    response = cur.fetchall()
    print(response)
    return response

def get_user(email):
    query = f"SELECT * FROM Users WHERE email = {email}"
    cur.execute(query)
    response = cur.fetchall()
    print(response)

def update_user(data):
    query = f"UPDATE Users SET name={data.name} email={data.email} password={data.password} WHERE = {data.id}"
    cur.execute(query)
    response = cur.fetchall()
    return response

def delete_user(id):
    query = f"DELETE FROM users WHERE id = {id}"
    cur.execute(query)
    response = cur.fetchall()
    return response

#-------

def get_list(id):
    query = f"SELECT * FROM Shopping_List WHERE list_id = {id}"
    cur.execute(query)
    response = cur.fetchall()
    print(response)

def get_all_lists(id):
    query = f"SELECT product_id FROM Shopping_List JOIN Users_Shopping ON Shopping_List.list_id = Users_Shopping.id WHERE Users_Shopping.user_id = {id}"
    cur.execute(query)
    response = cur.fetchall()
    print(response)

def get_favourites(id):
    query = f"SELECT * FROM Favourites WHERE user_id = {id}"
    cur.execute(query)
    response = cur.fetchall()
    print(response)

def get_products():
    query = "SELECT * FROM Products"
    cur.execute(query)
    response = cur.fetchall()
    print(response)

# get_user(1)
# get_favourites(1)
# get_list(1)
# get_all_lists(1)