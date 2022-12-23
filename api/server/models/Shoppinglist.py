from temp import cur

class Shoppinglist():
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