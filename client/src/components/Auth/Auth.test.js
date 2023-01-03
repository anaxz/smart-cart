import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Auth from './index'

const MockAuth = () => {
    return (
        <BrowserRouter>
            <Auth />
        </BrowserRouter>
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