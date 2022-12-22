from app import app
import pytest

def api():
    client = app.test_client()