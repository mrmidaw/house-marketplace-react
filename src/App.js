import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Explore } from './pages/Explore';
import { ForgotPassword } from './pages/ForgotPassword';
import { NotFound } from "./pages/NotFound";
import { Offers } from './pages/Offers';
import { Profile } from './pages/Profile';
import { SingIn } from './pages/SingIn';
import { SingUp } from './pages/SingUp';
import { Navbar } from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<PrivateRoute />} >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sing-in" element={<SingIn />} />
          <Route path="/sing-up" element={<SingUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;