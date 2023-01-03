from ..temp import cur, conn

class Shoppinglist():
    def get_list(id):
        query = f"SELECT * FROM Shopping_List WHERE list_id = {id}"
        cur.execute(query)
        response = cur.fetchone()
        print(response)

    def get_all_lists(id):
        query = f"SELECT product_id FROM Shopping_List JOIN Users_Shopping ON Shopping_List.list_id = Users_Shopping.id WHERE Users_Shopping.user_id = {id}"
        cur.execute(query)
        response = cur.fetchall()
        print(response)

    def get_price_by_supermarket(list, supermarket):
        total = 0
        for item in list:
            query = f"SELECT {supermarket} FROM Products JOIN Prices ON Prices.product_id = Products.id WHERE Products.name = '{item}'"
            cur.execute(query)
            response = cur.fetchone()
            print(response)
            total += response[0]
        print(total)
        return total

    def get_price_by_nearby_supermarket(list, ip):
        total = 0

        import requests
        import json
        from urllib.request import urlopen

        url='http://ipinfo.io/json'
        response = urlopen(url)
        data = json.load(response)

        print(data)
        latlon = data['loc'].split(',')
        print(latlon)

        api_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latlon[0]}%2C{latlon[1]}&radius=1500&type=convenience_store&key=AIzaSyAAOpsLqUS8AFih-Fp2QgeldirT-Eoc0zg"

        payload={}
        headers = {}

        response = requests.request("GET", api_url, headers=headers, data=payload).json()


        supermarkets = ['Tesco', 'Sainsburys', 'Aldi', 'Asda', 'Waitrose', 'Iceland', 'Morrisons', 'M&S']
        for item in list:
            query = f"SELECT {supermarket} FROM Products JOIN Prices ON Prices.product_id = Products.id WHERE Products.name = '{item}'"
            cur.execute(query)
            response = cur.fetchone()
            print(response)
            total += response[0]
        print(total)
        return total
