import './global.css';
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'
import Navigation from './src/Navigation'

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}
