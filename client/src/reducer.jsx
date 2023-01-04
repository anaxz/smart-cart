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

export const findItem = (data) => {
    console.log('works')
    console.log(data)

    return {
        type: 'search',
        payload: data
    }
}

//REDUCER

export function useItems() {
    return useSelector(state => state)
}

function remove(state, item) {
    state.arr.splice(state.arr.indexOf(item), 1)
    return state.arr
}


export const itemReducer = (state = { arr: [], user: '', item: [] }, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                arr: state.arr.concat(action.payload)
            }

        case 'delete':
            return {
                ...state,
                arr: remove(state, action.payload)
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
        case 'search':
            return {
                ...state,
                item: action.payload
            }
        default:
            return state
    }
}





