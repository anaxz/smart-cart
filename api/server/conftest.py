from . import create_app
import pytest

from .auth import *

app = create_app()

@pytest.fixture
def auth_api(monkeypatch):
    test_data = { 
        "name": "test1", 
        "email": "test1@email.com", 
        "password": "pass1" 
    }

    monkeypatch.setattr(login, "login", test_data)

    api = app.test_client()
    return api
