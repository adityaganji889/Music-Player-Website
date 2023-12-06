import './App.css';
import './resources/authentication.css';
import './resources/transactions.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AOS from 'aos';
import VerifyEmail from './pages/verifyEmail';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmailLink from './pages/VerifyEmailLink';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordLink from './pages/resetPasswordLink';
import LandingPage from './pages/LandingPage';
import PublicRoute from './components/PublicRoute';
import UpdateEmail from './pages/UpdateEmail';
import UpdatePassword from './pages/UpdatePassword';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import CreateEditPlaylist from './pages/CreateEditPlaylist';
import AdminPage from './pages/AdminPage';
import UsersList from './pages/UsersList';
import SongsListAdmin from './pages/SongsListAdmin';
import AddSongPage from './pages/AddSongPage';

function App() {
  AOS.init()
  const {loading} = useSelector(state=>state.loadingReducer);
  return (
    <Router>
      {loading&&<Loader/>}
      <Routes>
        <Route path="/" element={<PublicRoute><LandingPage/></PublicRoute>}/>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path="/verifyemail/:id" element={<PublicRoute><VerifyEmail/></PublicRoute>}/>
        <Route path="/verifyEmailLink" element={<PublicRoute><VerifyEmailLink/></PublicRoute>}/>
        <Route path="/resetPasswordLink" element={<PublicRoute><ResetPasswordLink/></PublicRoute>}/>
        <Route path="/resetpassword/:id" element={<PublicRoute><ResetPassword/></PublicRoute>}/>
        <Route path="/updateEmail" element={<ProtectedRoute><UpdateEmail/></ProtectedRoute>}/>
        <Route path="/updatePassword" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/createEditPlaylist" element={<ProtectedRoute><CreateEditPlaylist/></ProtectedRoute>}/>
        <Route path="/admin" element={<AdminPage/>}>
           <Route path="usersList" element={<UsersList/>}/>
           <Route path="songsList" element={<SongsListAdmin/>}/>
           <Route path="addSong" element={<AddSongPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
