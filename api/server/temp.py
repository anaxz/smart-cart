import os
import psycopg2

url = "postgres://admin:x3tGfygzNAP2JEOKGSHUMl1LOxQb4Ig9@dpg-ceirh32rrk0a7i0av6q0-a.frankfurt-postgres.render.com/smart_cart_kjou"

conn = psycopg2.connect(url)

cur = conn.cursor()
search = ' SELECT * FROM Users; '

def get_user(id):
    query = f"SELECT * FROM Users WHERE id = {id}"
    cur.execute(query)
    res = cur.fetchall()
    print(res)

def get_list(id):
    query = f"SELECT * FROM Shopping_List WHERE list_id = {id}"
    cur.execute(query)
    res = cur.fetchall()
    print(res)

def get_all_lists(id):
    query = f"SELECT product_id FROM Shopping_List JOIN Users_Shopping ON Shopping_List.list_id = Users_Shopping.id WHERE Users_Shopping.user_id = {id}"
    cur.execute(query)
    res = cur.fetchall()
    print(res)

def get_favourites(id):
    query = f"SELECT * FROM Favourites WHERE user_id = {id}"
    cur.execute(query)
    res = cur.fetchall()
    print(res)

get_user(1)
get_favourites(1)
get_list(1)
get_all_lists(1)