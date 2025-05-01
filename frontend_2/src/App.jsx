import NavBar from './components/NavBar'
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import View from './pages/View';
import AboutPage from './pages/AboutPage';

function App() {
  


  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/view/:id' element={<View />} />
    </Routes>
    
    </>
  )
}

export default App
