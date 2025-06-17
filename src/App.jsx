import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Homepage/Homepage";
import RegisteringPage from "./Registration/RegistrationPage";
import Login from "./Login-Page/Login";
import BuyerDashboard from "./Buyer-DashBoard/BuyerDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisteringPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Buyer/:Username" element={<BuyerDashboard />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
