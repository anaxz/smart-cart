from server import create_app
from main import *

def test__name__():
    mock_response = True

    # app = create_app()
    
    # if __name__ == '__main__':
    #     app.run(debug=mock_response)

    assert(__name__ == '__main__') == True