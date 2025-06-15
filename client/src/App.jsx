import Courses from "./components/Courses";
import { Layout } from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import { Home } from "./pages/Home";
import { Bounce, ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router";
import { Course } from "./components/Course";
import { useState, useEffect } from "react";
import { AuthContext } from "./contexts/authContext.js";
import { Purchases } from "./components/Purchases.jsx";
import {
  AdminLayout,
  AdminHome,
  AdminLogin,
  AdminRegister,
  AdminCourses,
  AdminCourse,
} from "./components/Admin";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  // const [user, setUser] = useState("Jesse Hall");

  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          <Routes>
            {/* USER ROUTES */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:courseId" element={<Course />} />
              <Route path="/purchases" element={<Purchases />} />
            </Route>

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="auth/login" element={<AdminLogin />} />
              <Route path="auth/register" element={<AdminRegister />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="course/:courseId" element={<AdminCourse />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </AuthContext.Provider>
    </>
  );
}

export default App;
