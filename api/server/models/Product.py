from ..temp import cur

class Product():
    def get_products():
        query = "SELECT * FROM Products"
        cur.execute(query)
        response = cur.fetchall()
        print(response)
        return response

    def add_products(data):
        query = f"INSERT INTO Products (name, category) VALUES ('{data.name}', '{data.category}')"
        cur.execute(query)
        response = cur.fetchall()
        return response

    def update_products(data):
        query = f"UPDATE Products SET name={data.name} category={data.category} WHERE = {data.id}"
        cur.execute(query)
        response = cur.fetchall()
        return response
    
    def delete_products(id):
        query = f"DELETE FROM Products WHERE id = {id}"
        cur.execute(query)
        response = cur.fetchall()
        return response