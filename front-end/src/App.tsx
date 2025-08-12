import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './context/Auth/AuthProvider'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
