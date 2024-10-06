import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './contexts/Auth/AuthContext';
import { Login } from './pages/login/login';
import { SignUp } from './pages/signup/signup';
import { ProtectedRoute } from './routes/protectedRoute';
import { Feed } from './pages/feed/feed';
import { Verified } from './pages/verified/verified';
import { Breed } from './pages/breed/breed';
import { BreedsProvider } from './contexts/Breed/BreedContext';
import UserProfile from './pages/userProfile/userProfle';

function App() {
  return (
    <AuthProvider>
      <BreedsProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verified" element={<Verified />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/breed"
            element={
              <ProtectedRoute>
                <Breed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
      </BreedsProvider>
    </AuthProvider>
  )
}

export default App
