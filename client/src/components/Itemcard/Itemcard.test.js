import React from 'react'
import { render, screen, fireEvent, getRoles } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Itemcard from './index'
import { itemReducer } from '../../reducer'

const MockItemcard = () => {
    const store = createStore(itemReducer)
    const data = jest.fn()
    const fav = jest.fn()

    return (
        <Provider store={store}>
        <BrowserRouter>
            <Itemcard data={data} fav={fav} />
        </BrowserRouter>
        </Provider>
    )
}

describe('Itemcard', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        render(<MockItemcard/>)
    })

    test('Itemcard cardGroup rendered', () => {
        const cardGroup = screen.getByTestId('card-group');
        expect(cardGroup).toBeTruthy();
    }) 

})