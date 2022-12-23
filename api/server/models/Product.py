from temp import cur

class Product():
    def get_products():
        query = "SELECT * FROM Products"
        cur.execute(query)
        response = cur.fetchall()
        print(response)