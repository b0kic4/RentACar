import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UserContextProvider from "./UserContext";
import ProfilePage from "./Pages/ProfilePage";
import CarPageForm from "./Pages/CarPageForm";
import CarDetailsPage from "./Pages/CarDetailsPage";
import MyCarsPage from "./Pages/MyCarsPage";
import EditCarPage from "./Pages/EditCarPage";
function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  return (
    <div className="bg-gray-200 w-screen h-screen">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-cars" element={<MyCarsPage />} />
            <Route path="/new" element={<CarPageForm />} />
            <Route path="/cars/:id" element={<CarDetailsPage />} />
            <Route path="/cars/edit-car/:id" element={<EditCarPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
