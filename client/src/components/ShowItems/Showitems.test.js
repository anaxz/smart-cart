import React from 'react'
import { render, screen, fireEvent, getRoles } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Showitems from './index'
import { itemReducer } from '../../reducer'

const MockShowitems = () => {
    const store = createStore(itemReducer)
    const data = jest.fn()
    const fav = jest.fn()
    const category = jest.fn()
    const all = jest.fn()

    return (
        <Provider store={store}>
        <BrowserRouter>
            <Showitems shopping={null} setShopping={null} data={data} category={category} fav={fav} all={all} />
        </BrowserRouter>
        </Provider>
    )
}

describe('Showitems', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        render(<MockShowitems/>)
    })

    test('Showitems row rendered', () => {
        const row = screen.getByTestId('ShowItems-row');
        expect(row).toBeTruthy();
    }) 

})