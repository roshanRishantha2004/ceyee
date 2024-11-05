import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import Songs from './pages/Songs';
import Dashboard from './pages/Dasboard';
import ArtistDashboard from './pages/ArtistDashboard';
import SongDashboard from './pages/SongDashboard';
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
      </Routes>
    </>
  );
}

export default App;
