from server import create_app
import pytest

app = create_app

def api():
    client = app.test_client()