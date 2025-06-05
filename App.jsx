import './global.css';
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'
import Navigation from './src/Navigation'
import { ThemeProvider } from './src/context/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  )
}
