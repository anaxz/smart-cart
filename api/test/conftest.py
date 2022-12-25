from server import create_app
import pytest

app = create_app

def api():
    api = app.test_client()
    return api