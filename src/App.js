import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Explore } from './pages/Explore';
import { ForgotPassword } from './pages/ForgetPassword';
import { NotFound } from "./pages/NotFound";
import { Offers } from './pages/Offers';
import { Profile } from './pages/Profile';
import { SingIn } from './pages/SingIn';
import { SingUp } from './pages/SingUp';
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sing-in" element={<SingIn />} />
        <Route path="/sing-up" element={<SingUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Navbar />
    </BrowserRouter>

  );
};

export default App;