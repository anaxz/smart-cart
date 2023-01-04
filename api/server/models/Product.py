from ..temp import cur, conn

class Product():
    def get_products():
        query = "SELECT * FROM Products"
        cur.execute(query)
        response = cur.fetchall()
        print(response)
        return response
    
    def get_one_product(id):
        query = f"SELECT * FROM Products WHERE id={id}"
        cur.execute(query)
        response = cur.fetchone()
        print(response)
        return response

    def add_product(data):
        query = f"INSERT INTO Products (name, category) VALUES ('{data['name']}', '{data['category']}')"
        cur.execute(query)
        conn.commit()
        return 'added a product'

    def update_product(data):
        query = f"UPDATE Products SET name='{data['name']}', category='{data['category']}' WHERE = {data['id']}"
        cur.execute(query)
        conn.commit()
        return 'update a product'
    
    def delete_product(id):
        query = f"DELETE FROM Products WHERE id = {id}"
        cur.execute(query)
        conn.commit()
        return 'delete a product'