from unittest.mock import Mock
from ..models.User import User

def test_get_user():
    mock_user = User('test1', 'test1@gmail.com', 'pass1')

    def mock_get_user_by_id():
        return 1

    mock_user.get_user_by_id = Mock(side_effect=mock_get_user_by_id)
    assert mock_user.name == 'test1'