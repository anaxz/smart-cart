from ..temp import cur, conn
import requests
import json
from urllib.request import urlopen

class Shoppinglist():
    def get_list(id):
        query = f"SELECT * FROM Shopping_List WHERE list_id = {id}"
        cur.execute(query)
        response = cur.fetchone()
        print(response)

    def get_all_lists(id):
        lists_query = f"SELECT DISTINCT Shopping_List.list_id FROM Shopping_List JOIN Users_Shopping ON Shopping_List.list_id = Users_Shopping.list_id WHERE Users_Shopping.user_id = {id}"
        cur.execute(lists_query)
        resp = cur.fetchall()
        print(resp)
        x = []
        for i in resp:
            x.append(i[0])
        print(x)

        query = f"SELECT Shopping_List.list_id, product_id FROM Shopping_List JOIN Users_Shopping ON Shopping_List.list_id = Users_Shopping.list_id WHERE Users_Shopping.user_id = {id}"
        cur.execute(query)
        response = cur.fetchall()
        print(response)

        y = []
        for i in x:
            arr = []

            for j in response:
                if i == j[0]:
                    arr.append(j[1])
            y.append(arr)
            arr=[]
        print(y)

        return y

    def get_price_by_supermarket(list, supermarket):
        total = 0
        for item in list:
            query = f"SELECT {supermarket} FROM Products JOIN Prices ON Prices.product_id = Products.id WHERE Products.name = '{item}'"
            cur.execute(query)
            response = cur.fetchone()
            total += response[0]
            print(total)
        return round(total,2)

    def get_price_by_nearby_supermarket(list, ip):

        url=f'https://ipinfo.io/{ip}?token=dd2e8a795d1efb'
        response = urlopen(url)
        data = json.load(response)

        print(data)
        latlon = data['loc'].split(',')
        print(latlon)

        api_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latlon[0]}%2C{latlon[1]}&radius=1500&type=convenience_store&key=AIzaSyAAOpsLqUS8AFih-Fp2QgeldirT-Eoc0zg"

        response = requests.request("GET", api_url, headers={}, data={}).json()

        supermarkets = ['Tesco', 'Sainsburys', 'Aldi', 'Asda', 'Waitrose', 'Iceland', 'Morrisons', 'M&S']
        results = []
        shops = response['results']
        for shop in shops:
            shop_name = shop['name'].split(' ')[0].replace("'", "")
            if shop_name in supermarkets:
                price = Shoppinglist.get_price_by_supermarket(list,shop_name)
                results.append({"supermarket": shop_name, "total": price})
        print(results)
        return results

    def get_price_by_top_supermarkets(list):
        results = []
        supermarkets = ['Tesco', 'Sainsburys', 'Aldi', 'Asda', 'Waitrose', 'Iceland', 'Morrisons', 'MnS']
        for supermarket in supermarkets:
            print(supermarket, Shoppinglist.get_price_by_supermarket(list, supermarket))
            results.append({"supermarket": supermarket, "total": Shoppinglist.get_price_by_supermarket(list, supermarket)})
        return results

    def save_list(data):
        user_id = data[0]
        list = data[1]
        select_product = f"SELECT * FROM Shopping_List"
        cur.execute(select_product)
        response = cur.fetchall()
        total = len(response)
        print(response)

        for item in list:
            select_product = f"SELECT * FROM Products WHERE name = '{item}'"
            cur.execute(select_product)
            product_id = cur.fetchone()[0]

            insert_list = f"INSERT INTO Shopping_List (list_id, product_id)  VALUES ({total}, {product_id}) RETURNING *;"
            cur.execute(insert_list)
            conn.commit()
            print('Inserted')
            resp = cur.fetchone()
            print(resp[0])

        insert = f"INSERT INTO Users_Shopping (list_id, user_id)  VALUES ({total}, {user_id}) RETURNING *;"
        cur.execute(insert)
        conn.commit()
        print('Inserted')
        res = cur.fetchone()
        print(res[0])
        return res[0]

    def delete_list():
        query = f"SELECT product_id FROM Shopping_List JOIN Users_Shopping ON Shopping_List.list_id = Users_Shopping.id WHERE Users_Shopping.user_id = {id}"
        cur.execute(query)
        response = cur.fetchall()
        print(response)


        # for item in list:
        #     query = f"SELECT {supermarket} FROM Products JOIN Prices ON Prices.product_id = Products.id WHERE Products.name = '{item}'"
        #     cur.execute(query)
        #     response = cur.fetchone()
        #     print(response)
        #     total += response[0]
        # print(total)
        # return total
