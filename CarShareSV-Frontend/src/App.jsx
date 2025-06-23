import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage"
import SignIn from "./pages/signIn/SignIn";
import LogIn from "./pages/logIn/LogIn";
import Explore from "./pages/explorePage/Explore";
import MyProfile from "./pages/myProfile/MyProfile";
import MyCars from "./pages/myCars/MyCars";
import PostPage from "./pages/postPage/PostPage";
import ActualRents from "./pages/actualRents/ActualRents";
import PastRents from "./pages/pastRents/PastRents";
import CarDetails from "./pages/carDetails/CarDetails";
import AdminProfile from "./pages/adminView/myProfileAdmin/myProfileAdmin";
import UsersList from "./pages/adminView/UsersList/userlist";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/myprofile" element={<MyProfile/>} />
        <Route path="/mycars" element={<MyCars/>} />
        <Route path="/post/new" element={<PostPage/>} />
        <Route path="/rents/actuals" element={<ActualRents/>} />
        <Route path="/rents/pasts" element={<PastRents/>} />
        <Route path="/car/1" element={<CarDetails />} />
        <Route path="/admin/myprofile" element={<AdminProfile />} />
        <Route path="/admin/users" element={<UsersList />} />

      </Routes>
    </Router>
  )
}

export default App
