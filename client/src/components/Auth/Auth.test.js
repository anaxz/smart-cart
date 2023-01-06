import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
global.fetch = require('jest-fetch-mock');

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

const mockChangeAuthMode = (authMode) = jest.fn(() => authMode === "signin" ? "signup" : "signin")

describe('Login', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        fetch.enableMocks();
        render(<MockAuth/>)
    })

    afterEach(() => {
        fetch.resetMocks();
     })

    test('Sign In heading rendered', () => {
        const heading = screen.getByRole('heading', { name: /Sign In/i });
        expect(heading).toBeTruthy();
    }) 

    test('email input rendered and able to type into it', () => {
        const inputElement = screen.getByPlaceholderText(/Enter email/i)
        expect(inputElement).toBeTruthy();

        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: "test1@gmail.com" } })
        expect(inputElement.value).toBe("test1@gmail.com");
    }) 

    test('password input rendered  and able to type into it', () => {
        const inputElement = screen.getByPlaceholderText(/Enter password/i)
        expect(inputElement).toBeTruthy();

        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: "pass1" } })
        expect(inputElement.value).toBe("pass1");
    }) 

    test('Submit button rendered', () => {
        const btn = screen.getByRole('button', { name: /Submit/i });
        fireEvent.click(btn)
        expect(btn).toBeTruthy();
    }) 

    test("'Not registered yet?' rendered", () => {
        const text1 = screen.getByText("Not registered yet?");
        expect(text1).toBeTruthy();
    }) 
})


describe('SignUp', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        fetch.enableMocks();
        render(<MockAuth/>)
    })

    afterEach(() => {
        fetch.resetMocks();
     })

    test('Sign Up heading rendered', () => {
        const heading = screen.getByRole('heading', { name: /Sign Up/i});
        expect(heading).toBeTruthy();
    }) 

    test('name input rendered and able to type into it', () => {
        const inputElement = screen.getByPlaceholderText(/e.g Abdul Kamara/i)
        expect(inputElement).toBeTruthy();

        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: "tester1" } })
        expect(inputElement.value).toBe("tester1");
    }) 

    test('email input rendered and able to type into it', () => {
        const inputElement = screen.getByPlaceholderText(/Enter email/i)
        expect(inputElement).toBeTruthy();

        fireEvent.click(inputElement)
        fireEvent.change(inputElement, { target: { value: "test1@gmail.com" } })
        expect(inputElement.value).toBe("test1@gmail.com");
    }) 

    test('both password input rendered and able to type into it', () => {
        const inputElement1 = screen.getByPlaceholderText(/Enter password/i)
        const inputElement2 = screen.getByPlaceholderText(/Repeat Password/i)
        expect(inputElement1).toBeTruthy();
        expect(inputElement2).toBeTruthy();

        fireEvent.click(inputElement1)
        fireEvent.change(inputElement1, { target: { value: "pass1" } })
        expect(inputElement1.value).toBe("pass1");

        fireEvent.click(inputElement2)
        fireEvent.change(inputElement2, { target: { value: "pass1" } })
        expect(inputElement2.value).toBe("pass1");
    }) 

    test("'Not registered yet?' rendered", () => {
        const text1 = screen.getByText("Not registered yet?");
        expect(text1).toBeTruthy();
    }) 

    test('render "sign-up" link', () => {
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
    })

    test('Submit button rendered', () => {
        const btn = screen.getByRole('button', { name: /Submit/i });
        fireEvent.click(btn)
        expect(btn).toBeTruthy();
    }) 
})