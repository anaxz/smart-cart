import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { createStore } from 'redux'
import { itemReducer } from './reducer'
import './assets/index.css'

const store = createStore(itemReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
    
  // </React.StrictMode>,
)
