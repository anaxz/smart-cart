import pytest
from unittest.mock import Mock
from ..models.User import User

def test_login():
    mock_user = User('test1', 'test1@gmail.com', 'pass1')

    def mock_get_user():
        return 'test1@gmail.com'

    mock_user.get_user = Mock(side_effect=mock_get_user)
    assert mock_user.email == 'test1@gmail.com'

def test_login_wrong_email():
    mock_user = User('test1', 'test1@gmail.com', 'pass1')

    def mock_get_user():
        return 'test1@gmail.com'

    mock_user.get_user = Mock(side_effect=mock_get_user)
    assert mock_user.email != 'wrong@gmail.com'

#--------

def test_login_api(api):
    mock_data = { 
        "name": "test1", 
        "email": "test1@email.com", 
        "password": "pass1" 
    }
    mock_headers = {'Content-Type': 'application/json'}
    res = api.post('/login', data=mock_data, headers=mock_headers)

    mock_user = User('test1', 'test1@gmail.com', 'pass1')
    request_data = Mock()

    assert res.json[mock_data]['name'] == 'test1'

def test_logout_api(api):
    res = api.get('/logout')
    assert res.json == {'200' : 'Logout successfull.'}

def test_logout_fail_api(api):
    res = api.get('/logout')
    assert res.json != {'200' : 'Logout successfull.'}