
import {Container} from "react-bootstrap";
import Signup from './components/signup/signup'
import Login from './components/login/login'
import Dashboard from './components/Dashboard/dashboard'
import { AuthProvider } from "./contexts/AuthContetxt";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoute from "./components/privateRoute";
import ForgotPassword from "./components/Password/forgotPassword";
import UpdateProfile from "./components/Profile/updateProfile";


function App() {
  return (
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight :"100vh"}}>
        <div className="w-100" style={{maxWidth:"400px"}}>
         <Router>
         <AuthProvider>
           <Routes>
             <Route exact path="/" element={<PrivateRoute component={Dashboard}/>}/>
             <Route exact path="/" element={<Dashboard/>}/>
             <Route path="/signup" element={<Signup/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/forgot-password" element={<ForgotPassword/>}/>
             <Route path="/update-profile" element={<UpdateProfile/>}/>
           </Routes>
         </AuthProvider>
           </Router> 
        </div>
      </Container>
 
  );
}

export default App;
