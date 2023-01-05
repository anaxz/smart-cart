import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Auth from './index'
import { itemReducer } from '../../reducer'

const MockAuth = () => {
    const store = createStore(itemReducer)
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Auth />
        </BrowserRouter>
        </Provider>
    )
}

describe('Login', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        render(<MockAuth/>)
    })

    test('Sign In heading rendered', () => {
        const heading = screen.getByRole('heading', { name: /Sign In/i });
        expect(heading).toBeTruthy();
    }) 

    test('Submit button rendered', () => {
        const btn = screen.getByRole('button');
        fireEvent.click(btn)
        expect(btn).toBeTruthy();
    }) 
})


describe('SignUp', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        render(<MockAuth/>)
    })

    test('Sign Up heading rendered', () => {
        const heading = screen.getByRole('heading', { name: /Sign Up/i });
        expect(heading).toBeTruthy();
    }) 
})