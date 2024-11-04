import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import Songs from './pages/Songs';
import Dashboard from './pages/Dasboard';
import Song from './pages/Song'
import ArtistDashboard from './pages/ArtistDashboard';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/songs' element={<Songs />} />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='song' element={<Song />} />
          <Route path='artist' element={<ArtistDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
