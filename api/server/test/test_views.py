import pytest

def test_home(api):
    """Prediction page initially loads with 0 pieces"""
    resp = api.get('/')
    assert resp.status == '200 OK'
    assert b'Welcome back' in resp.data

def test_get_products(api):
    """Prediction page initially loads with 0 pieces"""
    resp = api.get('/products')
    assert resp.status == '200 OK'
    assert len(resp.data) > 0

def test_get_one_product(api):
    """Prediction page initially loads with 0 pieces"""
    resp = api.get('/products/1')
    assert resp.status == '200 OK'
    assert resp.json['200'][1] == 'Bread'

    resp = api.get('/products/1000')
    assert resp.json['200'] == None

def test_get_product_by_name(api):
    """Prediction page initially loads with 0 pieces"""
    resp = api.get('/products/Bread')
    assert resp.status == '200 OK'
    assert resp.json['200'][0][1] == 'Bread'

def test_top(api):
    data = {"shopping":["Bread","Eggs","Milk"],"ip":"86.7.250.38"}
    resp = api.post('/nearby', data=data)
    assert resp.status == '200 OK'
    assert b'LegOh! | Thank you' in resp.data

# def test_post_reminder(api):
#     form_data = {'1',['Bread']}
#     resp = api.post('/savelist', data=form_data)
#     assert resp.status == '200 OK'
#     assert b'LegOh! | Thank you' in resp.data
