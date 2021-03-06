import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ColorModeScript } from '@chakra-ui/react'

import './index.css'
import App from './App'
import store from './redux/store'

render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript />
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
)
