import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import '@testing-library/jest-dom'
import Darknavbar from './index'; // component to test
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { itemReducer } from '../../reducer'
import { BrowserRouter } from 'react-router-dom';

const MockNavbar = () => {
    const store = createStore(itemReducer)
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Darknavbar />
        </BrowserRouter>
        </Provider>
    )
}

const links = [
    { text: 'Home', location: "/home" },
    { text: 'Profile', location: "/profile" },
    { text: 'About', location: "/about" },
    { text: 'Login', location: "/Auth" },
  ];

  test.each(links)(
    "Check if Nav Bar have %s link.",
    (link) => {
      render(<MockNavbar />);
      const linkDom = screen.getByText(link.text); 
          
      expect(linkDom).toHaveAttribute("href", link.location);
    }
  );
  

test('render "about" link', () => {
  render(<MockNavbar />);
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
})

test('render "about" link', () => {
  render(<MockNavbar />);

  const mockUser = null

  expect(mockUser == null).toBeTruthy();

  expect(screen.getByText("Saved Lists")).toBeInTheDocument();
  expect(screen.getByText("Log out")).toBeInTheDocument();
})
