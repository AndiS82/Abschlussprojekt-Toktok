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
import OtherProfilePage from './pages/ProfilePage/OtherProfilePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SearchPage from './pages/SearchPage/SearchPage';
import UnderConstructionPage from './pages/UnderConstructionPage/UnderConstructionPage';

function App() {
  const [user, setUser] = useState(false)
  const [userData, setUserData] = useState()
  const [userLoaded, setUserLoaded] = useState(false)

  //State für die drei Punkte
  const [showSettings, setShowSettings] = useState(false)


  return (
    <div>
      <UserContext.Provider value={userData}>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/Login' element={<LoginPages setUser={setUser} />} />
            <Route path='/Home' element={<HomePage user={user} setUserData={setUserData} userData={userData} setUserLoaded={setUserLoaded} userLoaded={userLoaded} showSettings={showSettings} setShowSettings={setShowSettings} />} />
            <Route path='/Comments/:postID' element={<CommentsPage setUserData={setUserData} setUserLoaded={setUserLoaded} userLoaded={userLoaded} />} />
            <Route path='/Newpost' element={<NewpostPage setUserData={setUserData} setUserLoaded={setUserLoaded} userLoaded={userLoaded} />} />
            <Route path='/Search' element={<SearchPage setUserData={setUserData} setUserLoaded={setUserLoaded} userLoaded={userLoaded} />} />
            <Route path='/UnderConstruction' element={<UnderConstructionPage setUserData={setUserData} setUserLoaded={setUserLoaded} userLoaded={userLoaded} />} />
            <Route path='/Profile' element={<ProfilePage setUserData={setUserData} setUserLoaded={setUserLoaded} userLoaded={userLoaded} showSettings={showSettings} setShowSettings={setShowSettings} />} />
            <Route path='/Profile/:user' element={<OtherProfilePage setUserData={setUserData} setUserLoaded={setUserLoaded} userLoaded={userLoaded} showSettings={showSettings} setShowSettings={setShowSettings} />} />
            <Route path='/EditProfile' element={<EditProfilePage setUserData={setUserData} setUserLoaded={setUserLoaded} userLoaded={userLoaded} />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
