import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Songs from './pages/Songs';
import Dashboard from './pages/Dasboard';
import ArtistDashboard from './pages/ArtistDashboard';
import SongDashboard from './pages/SongDashboard';
import AboutUs from './pages/AboutUs';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/songs' element={<Songs />} />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='song' element={<SongDashboard />} />
          <Route path='artist' element={<ArtistDashboard />} />
        </Route>
        <Route path='/about-us' element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
