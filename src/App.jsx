
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import PlaceDetails from './pages/PlaceDetails'
import Favorites from './pages/Favorites'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <h2>WanderWise</h2>

          <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
