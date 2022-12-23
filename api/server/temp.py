import os
import psycopg2

url = "postgres://test_2a4o_user:p0SqIlVeHJtjrDUdqWR0fKe6RhTbHRtN@dpg-ceip6ckgqg4dlfcjigd0-a.frankfurt-postgres.render.com/test_2a4o"

conn = psycopg2.connect(url)

cur = conn.cursor()
search = ' SELECT * FROM History; '

cur.execute(search)
res = cur.fetchall()
print(res)