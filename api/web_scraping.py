# Looping through product using selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

chrome_options = Options()

chrome_options.add_experimental_option("detach", True)
products = ['bread', 'butter', 'eggs', 'milk']
results = []
for product in products:
    url = f'https://www.sainsburys.co.uk/gol-ui/SearchResults/{product}'
    print(url)
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)

    driver.implicitly_wait(5)

    prices = []
    items = driver.find_elements(By.CLASS_NAME,'pt')
 
    for item in items:
        name = item.find_element(By.CLASS_NAME, 'pt__link')
        price = item.find_element(By.CLASS_NAME, 'pt__cost')
        p = price.find_element(By.TAG_NAME, 'span')

        if 'p' in p.text:
            prices.append(float('0.'+p.text.replace('p','')))
        else:
            prices.append(float(p.text.replace('£',''))) 

    print(f"{product}: {str(round(sum(prices)/len(prices),2))}")

    results.append({product, str(round(sum(prices)/len(prices),2))})
    driver.quit()

print(results)

#Looping through products using beautiful soup
supermarkets = [
    {
      'shop': 'Tesco',
      'item': {'element': 'li', 'class':'product-list--list-item'},
      'name': {'element': 'span', 'class':'ldbwMG'},
      'price': {'element': 'p', 'class':'jWPEtj'},
      'url': 'https://www.tesco.com/groceries/en-GB/search?query='
    },
    {
      'shop': 'M&S',
      'item': {'element': 'div', 'class':'fop-item'},
      'name': {'element': 'h4', 'class':'fop-title'},
      'price': {'element': 'span', 'class':'fop-price'},
      'url': 'https://www.ocado.com/search?entry='
    }, 
    {
      'shop': 'Morrisons',
      'item': {'element': 'div', 'class':'fop-item'},
      'name': {'element': 'h4', 'class':'fop-title'},
      'price': {'element': 'span', 'class':'fop-price'},
      'url': 'https://groceries.morrisons.com/search?entry='
    },
    {
      'shop': 'Iceland',
      'item': {'element': 'li', 'class':'grid-tile'},
      'name': {'element': 'a', 'class':'name-link'},
      'price': {'element': 'span', 'class':'product-sales-price'},
      'url': 'https://www.iceland.co.uk/search?q='
    },
    {
      'shop': 'Waitrose',
      'item': {'element': 'div', 'class':'content___3kznT'},
      'name': {'element': 'span', 'class':'name___h83Rn'},
      'price': {'element': 'span', 'class':'itemPrice___ieIBH'},
      'url': 'https://www.waitrose.com/ecom/shop/search?&searchTerm='
    }
    ]
  
products = ['bread', 'butter', 'milk', 'eggs']
# Web Scraping for Tesco
import requests
from bs4 import BeautifulSoup

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36 Edg/87.0.664.47','Connection': 'keep-alive','Cache-Control': 'max-age=0','Upgrade-Insecure-Requests': '1',
'Accept-Encoding': 'gzip, deflate',
'Accept-Language': 'en-US,en;q=0.9',
'Cookie': 'AuthSession=dddddd'}

#shop = supermarkets[4]
results = []
for i in range(len(supermarkets)):
  obj = {}
  obj['name'] = supermarkets[i]['shop']
  results.append(obj)
  for product in products:
    
    r = requests.get(supermarkets[i]['url']+product, headers=HEADERS)

    soup = BeautifulSoup(r.text, 'html.parser')
    print(soup.title)
    prices = []
    items = soup.findAll(supermarkets[i]['item']['element'], attrs={"class":supermarkets[i]['item']['class']})
    print(items)
    for item in items:
        name = item.find(supermarkets[i]['name']['element'], class_=supermarkets[i]['name']['class'])
        price = item.find(supermarkets[i]['price']['element'], class_=supermarkets[i]['price']['class'])

        if name and price:
          if supermarkets[i]['shop'] == 'Waitrose':
            # print(name.text)
            # print(price.span.text)
            # print(float(price.text.replace('£','')))
            if 'p' in price.span.text:
              # print('0.'+price.span.text.replace('p',''))
              prices.append(float('0.'+price.span.text.replace('p','')))
            else:
              prices.append(float(price.span.text.replace('£',''))) 
            # print('\n')
          else:
            # print(name.text)
            # print(price.text)
            # print(float(price.text.replace('£','')))
            if 'p' in price.text:
              # print('0.'+price.text.replace('p',''))
              prices.append(float('0.'+price.text.replace('p','')))
            else:
              prices.append(float(price.text.replace('£',''))) 
            # print('\n')
    # print(prices)
    # print('Average: '+str(round(sum(prices)/len(prices),2)))
    results[i][product] = str(round(sum(prices)/len(prices),2))

print(results)
import requests

response = requests.get(
  url='https://proxy.scrapeops.io/v1/',
  params={
      'api_key': 'c17b7c28-a3dc-46d4-b904-382e6e910362',
      'url': 'https://groceries.asda.com/search/butter', 
      'headers' : {'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'}
  },
)

soup = BeautifulSoup(response.text, 'html.parser')
print(soup.title)

items = soup.findAll('a', attrs={"class":"co-product__anchor"})
print(items)

def nearby_shops():
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

  shops = response['results']
  for shop in shops:
    print(shop['name'])
