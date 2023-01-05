import React from 'react'
import { render, screen, fireEvent, getRoles } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Foodbar from './index'
import { itemReducer } from '../../reducer'

const MockFoodbar = () => {
    const store = createStore(itemReducer)
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Foodbar />
        </BrowserRouter>
        </Provider>
    )
}

describe('Foodbar', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        render(<MockFoodbar/>)
    })

    test('Foodbar main tab rendered', () => {
        const groupTab = screen.getByTestId('fill-tab-example');
        expect(groupTab).toBeTruthy();
    }) 

})