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
            total += response[0]
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
            for y in supermarkets:
                # print(shop['name'])
                # print(y['shop'])
                if shop_name == y:
                    price = Shoppinglist.get_price_by_supermarket(list,y)
                    results.append({y : price})
                    
        return results

    def get_price_by_top_supermarkets(list):
        results = []
        supermarkets = ['Tesco', 'Sainsburys', 'Aldi', 'Asda', 'Waitrose', 'Iceland', 'Morrisons', 'MnS']
        for supermarket in supermarkets:
            print(supermarket, Shoppinglist.get_price_by_supermarket(list, supermarket))
            results.append({"supermarket": supermarket, "total": Shoppinglist.get_price_by_supermarket(list, supermarket)})
        return results



        # for item in list:
        #     query = f"SELECT {supermarket} FROM Products JOIN Prices ON Prices.product_id = Products.id WHERE Products.name = '{item}'"
        #     cur.execute(query)
        #     response = cur.fetchone()
        #     print(response)
        #     total += response[0]
        # print(total)
        # return total
