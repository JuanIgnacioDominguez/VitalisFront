import './global.css';
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'
import Navigation from './src/Navigation'
import { ThemeProvider } from './src/context/ThemeContext'
import { NetworkProvider } from './src/context/NetworkContext'
import { LanguageProvider } from './src/context/LanguageContext'
import NetworkPopup from './src/components/PopUps/NetworkPopup'

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <NetworkProvider>
          <Provider store={store}>
            <Navigation />
            <NetworkPopup />
          </Provider>
        </NetworkProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
