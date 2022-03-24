import React from 'react'
import 'bulma/css/bulma.min.css'

import Provider from './components/Provider'
import AppRoutes from './routes'

function App() {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  )
}

export default App
