import { Route, Routes } from 'react-router'
import './App.css'
import MainLayout from './pages/AppLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import { SignUp } from './pages/Signup'
import GlobalAlert from './components/GlobalAlert'
import Cart from './pages/Cart'



function App() {

  return (
      <MainLayout>
        <GlobalAlert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<SignUp />} />
        </Routes>
      </MainLayout>
  )
}

export default App
