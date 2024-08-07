import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import logo from "../../assets/images/logo.png";
import CartContext from "../../context/CartContext";

const navLinks = [
  {
    display: "Home",
    url: "",
  },
  {
    display: "About",
    url: "about",
  },
  {
    display: "Menu",
    url: "menu",
  },
  {
    display: "Contact",
    url: "contact",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const { cartItems } = useContext(CartContext);

  const menuToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container mx-auto px-4">
        <div className="navigation">
          <NavLink className="logo" to={"/"}>
            <span className="flex items-center gap-1">
              <i className="ri-restaurant-2-line"></i>
              <img src={logo} alt="logo" className="logo-icon" />
            </span>
          </NavLink>

          {isMenuOpen && (
            <div className="nav__menu flex md:hidden">
              <div
                className="nav__list__wrapper p-4 flex items-center gap-5"
                ref={menuRef}
              >
                <div className="logo flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <i className="ri-restaurant-2-line"></i>
                    <img src={logo} alt="logo" className="logo-icon" />
                  </span>
                  <i
                    className="ri-menu-line close-nav"
                    onClick={menuToggle}
                  ></i>
                </div>

                <ul className="nav__list_mobile">
                  {navLinks.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={`/${item.url}`}
                        onClick={menuToggle}
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <ul className="nav__list">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={`/${item.url}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>

          <div>
            <NavLink className="cart__icon" to={"/cart"}>
              <i className="ri-shopping-basket-line"></i>
              <span className="badge">{cartItems.length}</span>
            </NavLink>
          </div>

          <div className="mobile__menu flex md:hidden">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
