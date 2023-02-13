import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContext } from './contexts/UserContext';
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
  const [user, setUser] = useState(false)
  const [userData, setUserData] = useState(null)
  return (
    <div>
      <UserContext.Provider value={userData}>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/Login' element={<LoginPages setUser={setUser} setUserData={setUserData} />} />
            <Route path='/Home' element={<HomePage user={user} />} />
            <Route path='/Comments/:postID' element={<CommentsPage />} />
            <Route path='/Newpost' element={<NewpostPage />} />
            <Route path='/Search' element={<SearchPage />} />
            <Route path='/UnderConstruction' element={<UnderConstructionPage />} />
            <Route path='/Profile' element={<ProfilePage />} />
            <Route path='/EditProfile' element={<EditProfilePage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
