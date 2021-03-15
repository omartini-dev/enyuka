import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { render } from "react-dom"
// import "../css/style.css"

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pageYOffset: 0,
      isModalOpen: false,
      showModal: false,
    }
  }
  componentDidMount() {
    let header = document.querySelector("header")
    let triggerPoint = 70
    let logoPline = document.querySelector(".plain-logo")
    let logoWhite = document.querySelector(".white-logo")
    window.addEventListener("scroll", function () {
      if (window.pageYOffset >= triggerPoint) {
        header.classList.add("minimized")
        logoPline.classList.remove("open")
        logoWhite.classList.add("open")
      } else {
        header.classList.remove("minimized")
        logoPline.classList.add("open")
        logoWhite.classList.remove("open")
      }
    })

    document.querySelector(".menu-icon").addEventListener("click", function () {
      this.classList.toggle("open")
      if (document.querySelector(".container")) {
        document.querySelector(".container").classList.toggle("nav-open")
      }
      document
        .querySelectorAll("nav ul li")
        .forEach(el => el.classList.add("animate"))
      if (window.innerWidth < 769) {
        document
          .querySelectorAll("nav")
          .forEach(el => el.classList.toggle("mobile-nav"))
      } else {
        document
          .querySelectorAll("nav")
          .forEach(el => el.classList.remove("mobile-nav"))
      }
    })
  }
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li className="logo-content">
              <Link to="/">
                <img
                  src={"../../images/enyuka-logo.png"}
                  alt="Enyuka Logo"
                  title="Logo"
                  className="plain-logo open"
                />
                <img
                  src="../../images/enyuka-white-logo.png"
                  alt="Enyuka Logo"
                  title="Logo"
                  className="white-logo"
                />
              </Link>
            </li>
            <li className="menu-items">
              <ul>
                <li className="m_item active">
                  <Link to="/">Home</Link>
                </li>
                <li className="m_item">
                  <Link to="/">About us</Link>
                </li>
                <li className="m_item">
                  <Link to="/">Portfolio</Link>
                </li>
                <li className="m_item">
                  <Link to="/">Contact</Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="menu-icon">
            <span></span>
          </div>
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
