import ListingCardDetail from "../ListingCardDetail/ListingCardDetail";
import "./ListingCard.css";
import { useNavigate } from "react-router-dom";

export default function ListingCard({ listing, index, handleSelectListing }) {
  const navigate = useNavigate();

  const handleOnclick = () => {
    handleSelectListing(listing);
    navigate(`/ListingDetails/${index}`);
  };
  return (
    <div className="Listing-Card" onClick={handleOnclick}>
      <div className="img">
        <img src={listing.image} alt={listing.title} />
      </div>
      <h4>{listing.title}</h4>
      <h6>Owned by {listing.hostedBy}</h6>
      <div className="Details">
        <ListingCardDetail>
          <span>
            <i class="fa-solid fa-bed"></i>
          </span>
          <h5>{listing.bedrooms} bedrooms</h5>
        </ListingCardDetail>
        <ListingCardDetail>
          <span>
            <i class="fa-solid fa-bath"></i>
          </span>
          <h5>{listing.bathrooms} bathrooms</h5>
        </ListingCardDetail>
        <ListingCardDetail>
          <span>
            <i class="fa-solid fa-person"></i>
          </span>
          <h5>{listing.numberOfGuests} guests</h5>
        </ListingCardDetail>
        <ListingCardDetail>
          <span>
            <i class="fa-solid fa-star"></i>
          </span>
          <h5>5 (100)</h5>
        </ListingCardDetail>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Corrected
          gap: "0px", // Ensures spacing between items
        }}
      >
        <h2 style={{ margin: 0, marginTop: 20 }}>$ {listing.pricePerNight}</h2>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "Green",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            maxWidth: "200px",
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
