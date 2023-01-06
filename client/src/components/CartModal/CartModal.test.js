import React from 'react'
import { render, screen, fireEvent, getRoles } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import CartModal, { saveList } from './index'
import { itemReducer } from '../../reducer'
global.fetch = require('jest-fetch-mock');

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

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

const mockSaveList = jest.fn(() => CartModal.saveList)

describe('CartModal', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        fetch.enableMocks();
        render(<MockCartModal/>)
    })

    afterEach(() => {
       fetch.resetMocks();
    })

    test('CartModal heading rendered', () => {
        const heading = screen.getByText(/Your Smart-Cart/i);
        expect(heading).toBeTruthy();
    }) 

    test('Cart button rendered', () => {
        const button = screen.getByRole('button', { name: /Cart/i });
        expect(button).toBeTruthy()
    }) 

    test('Compare Prices button rendered', () => {
        const button = screen.getByRole('button', { name: /Compare Prices!/i } );
        expect(button).toBeTruthy()
    }) 

    test('saveList - make a request at http://127.0.0.1:5000/savelist', () => {
        //let url = 'http://127.0.0.1:5000/savelist'
        
        expect(fetch).toHaveBeenCalled();
        expect(mockSaveList().then(mockJson)).toBeTruthy();
        expect(mockSaveList().then(mockJson).then(mockRes)).toBeTruthy();
    })
})