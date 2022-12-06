import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Create from "./components/places/Create";
import UserList from "./components/users/UserList";
import PlaceList from "./components/places/PlaceList";
import Edit from "./components/places/Edit";
import Signup from "./components/users/Signup";
import Login from "./components/users/Login";
import { useSelector } from "react-redux";

function App() {
  const authState = useSelector((state) => state.isLoggedIn);
  return (
    <Router>
      <NavBar />
      <Routes>
        {authState ? (
          <>
            <Route path="/places/:userId" element={<PlaceList />} />
            <Route path="/place/edit/:placeId" element={<Edit />} />
            <Route path="/place/create" element={<Create />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route path="/*" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
