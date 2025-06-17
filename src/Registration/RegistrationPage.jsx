import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./RegistrationPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [userType, setUserType] = useState("Buyer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [CNIC, setCNIC] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = () => {
    setError("");
    if (
      !firstName ||
      !lastName ||
      !username ||
      !phoneNo ||
      !password ||
      !CNIC
    ) {
      setError("*Please fill in all the required fields!");
      return;
    }
    setLoading(true);
    axios
      .post(`http://localhost:3000/api/LandRegistry/Registrations/`, {
        firstName,
        lastName,
        username,
        password,
        phoneNo,
        userType,
        CNIC,
      })
      .then((response) => {
        setLoading(false);
        setFirstName("");
        setPassword("");
        setLastName("");
        setUsername("");
        setUserType("Buyer");
        setCNIC("");
        setError(null);
        setPhoneNo("");
        toast.success("Registration Successful!", {
          position: "top-center",
          style: {
            whiteSpace: "nowrap",
          },
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        toast.error("Error while Registering!. Please try again.", {
          position: "top-center",
          style: {
            whiteSpace: "nowrap",
          },
          autoClose: 5000,
        });
        setLoading(false);
      });
  };

  const paragraphStyle = {
    margin: "5px 0",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#007bff",
  };

  return (
    <div
      style={{
        padding: "0px",
        margin: "0px",
        backgroundImage: `url("./src/Luxury Stay in the Mountains.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ padding: "10px", maxWidth: "600px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#FFFFFFFF",
            fontWeight: "bold",
          }}
        >
          User Registration
        </h1>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="userType">User Type:</label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="Buyer">Buyer</option>
          <option value="Seller">Seller</option>
        </select>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="Username"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="email"
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            name="phoneNo"
            required
          />
        </label>
        <label>
          CNIC Number:
          <input
            type="tel"
            value={CNIC}
            onChange={(e) => setCNIC(e.target.value)}
            name="CNIC Number"
            required
          />
        </label>
        <button type="submit" onClick={handleRegister}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && (
        <div
          style={{
            color: "red",
            marginTop: "10px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
