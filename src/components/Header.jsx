import { useState, useEffect } from "react";
import "../components/Header.css"; // ملف الستايل اللي انت بعتني
import { Link } from "react-router-dom";
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // toggle drawer
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <nav className="navbar">
          {/* Logo */}
          <div className="logo">
            <img
              src={scrolled ? "/img/logo-1.png" : "/img/logo-2.png"}
              alt="IEEE Logo"
              id="logo"
            />
          </div>

          {/* Join button */}
          <div className="nav-button">
            <Link to="/join" id="join-btn">
              
            </Link>
          </div>

          {/* Menu toggle (hamburger) */}
          <div
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            id="menu-toggle"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
          </div>

          {/* Links */}
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/wie">WiE</Link>
            </li>
            <li>
              <Link to="/CS">CS</Link>
            </li>
            <li>
              <Link to="/AESS">AESS</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Drawer overlay */}
      <div
        className={`drawer-overlay ${menuOpen ? "show" : ""}`}
        id="drawer-overlay"
        onClick={closeMenu}
      ></div>
    </>
  );
}
