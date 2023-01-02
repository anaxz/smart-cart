import requests
import json

def test_login(auth_api):
    res = auth_api.get('/login')
    assert res.json == { 
        "name": "test1", 
        "email": "test1@email.com", 
        "password": "pass1" 
    }

# try below and comment out monkeypatch.setattr in conftest 

def test_api_post_dogs(api):
    mock_data = json.dumps({'name': 'Molly'})
    mock_headers = {'Content-Type': 'application/json'}
    res = api.post('/api/dogs', data=mock_data, headers=mock_headers)
    assert res.json['dog']['id'] == 3

# url = 'http://127.0.0.1:5000'
# def test_login():
#     payload = { 
#         "name": "test1", 
#         "email": "test1@email.com", 
#         "password": "pass1" 
#     }
#     resp = requests.get(f'${url}/login', json=payload)
#     assert resp.status_code == 200