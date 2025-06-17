import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div class="icons">
        <a href="#" id="instagram" aria-label="Instagram">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="#" id="facebook" aria-label="facebook">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a href="#" id="twitter" aria-label="twitter">
          <i class="fa-brands fa-twitter"></i>
        </a>
      </div>
      <div className="footer-content">
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Discover</h4>
          <ul>
            <li>
              <a href="#">Stays</a>
            </li>
            <li>
              <a href="#">Experiences</a>
            </li>
            <li>
              <a href="#">Online Experiences</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Cancellation Options</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Cookie Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Airbnb Clone. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
