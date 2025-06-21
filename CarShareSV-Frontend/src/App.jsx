import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage"
import SignIn from "./pages/signIn/SignIn";
import LogIn from "./pages/logIn/LogIn";
import Explore from "./pages/explorePage/Explore";
import MyProfile from "./pages/myProfile/MyProfile";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/myprofile" element={<MyProfile/>} />
      </Routes>
    </Router>
  )
}

export default App
