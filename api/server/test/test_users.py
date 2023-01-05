from unittest.mock import Mock
from ..models.User import User
import pytest

def test_get_user():
    mock_user = User('test1', 'test1@gmail.com', 'pass1')

    def mock_get_user_by_id():
        return 1

    mock_user.get_user_by_id = Mock(side_effect=mock_get_user_by_id)
    assert mock_user.name == 'test1'

def test_get_users():
    mock_user = User('test1', 'test1@gmail.com', 'pass1')

    def mock_get_user_by_id():
        return 1
    mock_user.get_user = Mock(side_effect=mock_get_user_by_id)
    assert mock_user == User('test1', 'test1@gmail.com', 'pass1')

def test_get_all_user():
    mock_users = [User('test1', 'test1@gmail.com', 'pass1'), User('test2', 'test2@gmail.com', 'pass1')] 

    def mock_get_user_by_id():
        return 1
    User.get_all_users = Mock(side_effect=mock_get_user_by_id)
    assert mock_users == [User('test1', 'test1@gmail.com', 'pass1'), User('test2', 'test2@gmail.com', 'pass1')] 

def test_update_user():
    mock_user = User('test1', 'test1@gmail.com', 'pass1')

    def mock_update_user():
        return User('test2', 'test1@gmail.com', 'pass1')

    mock_user.update_user = mock_update_user

    assert mock_user.update_user().name  == 'test2'

def test_get_all_lists(api):
    resp = api.get('/users/1/all-shoplist')
    assert resp.status == '200 OK'
    assert len(resp.data) > 0

def test_get_favs(api):
    resp = api.get('/users/1/favs')
    assert resp.status == '200 OK'
    assert len(resp.data) > 0

def test_add_fav(api):
    data = """[2, true]"""
    resp = api.post('/users/1/favs', data=data)
    assert resp.status == '200 OK'
    assert len(resp.data) > 0

def test_delete_fav(api):
    data = """[2, ]"""
    resp = api.post('/users/1/favs', data=data)
    assert resp.status == '200 OK'
    assert len(resp.data) > 0