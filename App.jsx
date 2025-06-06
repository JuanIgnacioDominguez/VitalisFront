import './global.css';
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'
import Navigation from './src/Navigation'
import { ThemeProvider } from './src/context/ThemeContext'
import { NetworkProvider } from './src/context/NetworkContext'
import NetworkPopup from './src/components/PopUps/NetworkPopup'

export default function App() {
  return (
    <ThemeProvider>
      <NetworkProvider>
        <Provider store={store}>
          <Navigation />
          <NetworkPopup />
        </Provider>
      </NetworkProvider>
    </ThemeProvider>
  )
}
