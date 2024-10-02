import 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ScrollProvider } from './utils/ScrollProvider'

function App() {

  return (
    <ScrollProvider>
      <RouterProvider router={router} />
    </ScrollProvider>
  )
}

export default App
