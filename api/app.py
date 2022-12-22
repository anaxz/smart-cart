from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder='../client/dist', static_url_path='/')
CORS(app)

@app.route('/')
def default():
    return 'Welcome back'

@app.route('/test')
def test():
    temp = ["data1", "data2"]
    return temp

if __name__ == '__main__':
    app.run(debug=True)