import React from 'react'
import { render, screen, fireEvent, getRoles } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import CartModal from './index'
import { itemReducer } from '../../reducer'

const MockCartModal = () => {
    const store = createStore(itemReducer)
    return (
        <Provider store={store}>
        <BrowserRouter>
            <CartModal />
        </BrowserRouter>
        </Provider>
    )
}

describe('CartModal', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        render(<MockCartModal/>)
    })

    test('CartModal heading rendered', () => {
        const heading = screen.getByRole('heading', { name: /Your Smart-Cart/i });
        expect(heading).toBeTruthy();
    }) 

    test('CartModal buttons rendered', () => {
        console.log(buttons.length)
        const buttons = screen.getAllByRole('button');
        expect(buttons).toBeTruthy()
    }) 
})