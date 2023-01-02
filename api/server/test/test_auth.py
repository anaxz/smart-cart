import requests
import json
from unittest.mock import Mock

from ..models.User import User

def test_login():
    mock_user = User('test1', 'test1@gmail.com', 'pass1')

    def mock_get_user():
        return 'test1@gmail.com'

    mock_user.get_user = Mock(side_effect=mock_get_user)
    assert mock_user.email == 'test1@gmail.com'



# def test_login(auth_api):
#     res = auth_api.get('/login')
#     assert res.json == { 
#         "name": "test1", 
#         "email": "test1@email.com", 
#         "password": "pass1" 
#     }

# try below and comment out monkeypatch.setattr in conftest 

# def test_login(auth_api):
#     mock_data = { 
#         "name": "test1", 
#         "email": "test1@email.com", 
#         "password": "pass1" 
#     }
#     mock_headers = {'Content-Type': 'application/json'}

#     res = auth_api.post('/login', data=mock_data, headers=mock_headers)
#     assert res.json == mock_data