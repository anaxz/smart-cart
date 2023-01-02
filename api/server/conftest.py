from . import create_app
import pytest

from .auth import *

app = create_app()

# general api -> make separate api func if you are using monkeypatch
@pytest.fixture
def api():
    api = app.test_client()
    return api
