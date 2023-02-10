import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CommentsPage from './pages/CommentsPage/CommentsPage';
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPages from './pages/LoginPages/LoginPages';
import NewpostPage from './pages/NewpostPage/NewpostPage';
import EditProfilePage from './pages/ProfilePage/EditProfilePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SearchPage from './pages/SearchPage/SearchPage';
import UnderConstructionPage from './pages/UnderConstructionPage/UnderConstructionPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/Login' element={<LoginPages />} />
          <Route path='/Home' element={<HomePage />} />
          <Route path='/Comments/:postID' element={<CommentsPage />} />
          <Route path='/Newpost' element={<NewpostPage />} />
          <Route path='/Search' element={<SearchPage />} />
          <Route path='/UnderConstruction' element={<UnderConstructionPage />} />
          <Route path='/Profile' element={<ProfilePage />} />
          <Route path='/EditProfile' element={<EditProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
