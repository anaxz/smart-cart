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

//REDUCER

export function useItems() {
    return useSelector(state => state)
}

export const itemReducer = (state = { arr: [] }, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                arr: state.arr.concat(action.payload)
            }

        case 'delete':
            return {
                ...state,
                arr: state.arr.splice(0, state.arr.length - 1)
            }
        default:
            return state
    }
}


