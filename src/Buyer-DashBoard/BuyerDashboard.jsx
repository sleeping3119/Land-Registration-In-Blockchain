import React, { useState, useEffect } from "react";
import axios from "axios";
import Listings from "../Listings/Listings";
import Footer from "../footer/footer";
import { useParams } from "react-router-dom";

const BuyerDashboard = () => {
  const { username } = useParams();
  const [ownedProperties, setOwnedProperties] = useState([]);

  useEffect(() => {
    const fetchOwnedProperties = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/LandRegistry/Listings/${username}?PropertyStatus=${"Bought"}`
        ); // Adjust the URL according to your backend API
        setOwnedProperties(response.data);
      } catch (error) {
        console.error("Error fetching owned properties:", error);
      }
    };

    fetchOwnedProperties();
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center", color: "#007bff" }}>
          Buyer Dashboard
        </h1>

        <section style={{ marginTop: "20px" }}>
          <h2>Owned Properties</h2>
          {ownedProperties.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {ownedProperties.map((property) => (
                <li
                  key={property.id} // Use a unique identifier
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <strong>ID:</strong> {property.id} <br />
                  <strong>Location:</strong> {property.location} <br />
                  <strong>Price:</strong> {property.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>No owned properties found.</p>
          )}
        </section>
      </div>
      <div style={{ padding: "20px" }}>
        <h2>Properties to Buy</h2>
      </div>
      <Listings />
      <Footer />
    </>
  );
};

export default BuyerDashboard;
