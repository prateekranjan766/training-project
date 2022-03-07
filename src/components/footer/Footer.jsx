import "./footer.styles.css";

import appStoreImage from "./app-store-img.png";
import playStoreImage from "./play-store-img.png";
import footerLogo from "./footer-logo.png";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="company-info">
        <div className="company-info__container">
          <p className="company-info__type">Company</p>
          <ul className="company-info__list">
            <li className="company-info__list__item">
              <a href="#">About us</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Team</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Careers</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Blogs</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Bug bounty</a>
            </li>
          </ul>
        </div>
        <div className="company-info__container">
          <p className="company-info__type">Contact</p>
          <ul className="company-info__list">
            <li className="company-info__list__item">
              <a href="#">Help & Support</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Partner with us</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Ride with us</a>
            </li>
          </ul>
        </div>
        <div className="company-info__container">
          <p className="company-info__type">Legal</p>
          <ul className="company-info__list">
            <li className="company-info__list__item">
              <a href="#">Terms & Conditions</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Refund & Cancellation</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Privacy policy</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Cookie policy</a>
            </li>
            <li className="company-info__list__item">
              <a href="#">Offer Items</a>
            </li>
          </ul>
        </div>
        <div className="company-info__container">
          <div className="company-info__downloads">
            <a href="#">
              <img src={appStoreImage} alt="image for app download for ios" />
            </a>
            <a href="#">
              <img src={playStoreImage} alt="image for app download for ios" />
            </a>
          </div>
        </div>
      </div>
      <div className="copyright-section">
        <img className="copyright__logo" src={footerLogo} alt="swiggy-logo" />
        <p className="copyright__text">&copy; 2022 Swiggy</p>
        <div className="social-media">
          <a href="#" className="social-media__icons">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="social-media__icons">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="social-media__icons">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="social-media__icons">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
