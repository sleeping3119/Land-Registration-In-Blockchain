import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userType, setUserType] = useState("Admin");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("*Please fill in all the required fields!");
      return;
    }
    if (userType == "Admin") {
      if (username == "Admin" && password == "@admin123") {
        toast.success("Admin Login Successful!", {
          position: "top-center",
          style: {
            whiteSpace: "nowrap",
          },
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate("/admin");
        }, 5000);
      } else {
        toast.error("Admin Login Error", {
          position: "top-center",
          style: {
            whiteSpace: "nowrap",
          },
          autoClose: 5000,
        });
      }
    } else {
      setLoading(true);
      axios
        .get(
          `http://localhost:3000/api/LandRegistry/Registrations/${username}?userType=${userType}`
        )
        .then((response) => {
          setLoading(false);
          setUsername("");
          setPassword("");
          setError(null);
          toast.success("User Login Successful!", {
            position: "top-center",
            style: {
              whiteSpace: "nowrap",
            },
            autoClose: 5000,
          });
          setTimeout(() => {
            if (userType === "Buyer") navigate(`/Buyer/${username}`);
            else navigate(`/Seller/${username}`);
          }, 5000);
        })
        .catch((error) => {
          toast.error("Error while Logging In!. Check username and password", {
            position: "top-center",
            style: {
              whiteSpace: "nowrap",
            },
            autoClose: 5000,
          });
          setLoading(false);
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("./src/Luxury Stay in the Mountains.jpg")`,
        padding: "20px",
        margin: "0px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "94vh",
        width: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          User Login
        </h2>
        {error && (
          <div
            style={{
              marginBottom: "15px",
              color: "red",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="userType"
              style={{ display: "block", marginBottom: "5px" }}
            >
              User Type:
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="Admin">Admin</option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="username"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              width: "100%",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging-In..." : "Log-In"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
