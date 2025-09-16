import {Link} from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* موجة SVG فوق الفوتر */}
      <div className="footer-wave">
        <svg
          viewBox="0 0 1440 150"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            className="wave-path"
            fill="var(--accent-color)"
            d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,144C672,128,768,96,864,74.7C960,53,1056,43,1152,58.7C1248,75,1344,117,1392,138.7L1440,160V0H0Z"
          />
        </svg>
      </div>

      <div className="footer-logo">
        <img src="/img/logo-2.png" alt="Logo" />
        <p className="tagline">IEEE MET SB — Innovating the Future</p>
      </div>

      <div className="footer-container">
        {/* Contact & Social */}
        <div className="footer-column contact-social">
          <h3>Contact Us</h3>
          <p>
            <i className="fas fa-envelope"></i> ali.abdelnaser@ieee.org
          </p>
          <p>
            <i className="fas fa-phone"></i> +20 1068643407
          </p>
          <p>
            <i className="fas fa-location-dot"></i> Mansoura, Egypt
          </p>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/profile.php?id=61560937966305"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/ieeemetsb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/ieee-met-sb-pioneers/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.tiktok.com/@ieee.met"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-tiktok"></i>
            </a>
            <a
              href="https://wa.me/201068643407"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="mailto:ali.abdelnaser@ieee.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="footer-column quick-links">
          <h3>Quick Links</h3>
          <Link to="/">
            <i className="fas fa-angle-right"></i> Home
          </Link>
          <Link to="/events">
            <i className="fas fa-angle-right"></i> Events
          </Link>
          <Link to="/wie">
            <i className="fas fa-angle-right"></i> WiE
          </Link>
          <Link to="/CS">
            <i className="fas fa-angle-right"></i> CS
          </Link>
          {/* <Link to="/AESS">
            <i className="fas fa-angle-right"></i> AESS
          </Link> */}
          <Link to="/about">
            <i className="fas fa-angle-right"></i> About Us
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 IEEE MET SB. All rights reserved.</p>
      </div>
    </footer>
  );
}
