export const addItem = (data) => {
    return {
        type: 'add',
        payload: data
    }
}

export const deleteItem = (data) => {
    return {
        type: 'delete',
        payload: data
    }
}

export const loginUser = (data) => {
    return {
        type: 'login',
        payload: data
    }
}

export const logoutUser = () => {
    return {
        type: 'logout',
        payload: false
    }
}


//REDUCER

export function useItems() {
    return useSelector(state => state)
}

export const itemReducer = (state = { arr: [], user: '' }, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                arr: state.arr.concat(action.payload)
            }

        case 'delete':
            return {
                ...state,
                arr: state.arr.filter(function (item) {
                    return item !== action.payload
                })
            }
        case 'login':
            return {
                ...state,
                user: action.payload
            }

        case 'logout':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}





