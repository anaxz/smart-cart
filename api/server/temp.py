import os
import psycopg2

url = "postgres://admin:x3tGfygzNAP2JEOKGSHUMl1LOxQb4Ig9@dpg-ceirh32rrk0a7i0av6q0-a.frankfurt-postgres.render.com/smart_cart_kjou"

conn = psycopg2.connect(url)

cur = conn.cursor()
