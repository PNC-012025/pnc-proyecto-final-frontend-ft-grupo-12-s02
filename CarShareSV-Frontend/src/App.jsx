import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage"
import SignIn from "./pages/signIn/SignIn";
import LogIn from "./pages/logIn/LogIn";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/login" element={<LogIn/>} />
      </Routes>
    </Router>
  )
}

export default App
