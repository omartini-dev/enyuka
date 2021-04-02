import React from "react"
import enyukaWhiteLogo from "../images/enyuka-white-logo.png"
const Header = () => (
  <footer>
    <div className="foot-wrap">
      <div className="logo-bar">
        <img
          src={enyukaWhiteLogo}
          alt="Enyuka Logo"
          title="Logo"
        />
      </div>
      <div className="info-bar">
        <div>
          <h4>Phone</h4>
          <p>+27 11 202-0300</p>
        </div>
        <div>
          <h4>Email</h4>
          <p>info@inaniprop.co.za</p>
        </div>
        <div>
          <h4>Address</h4>
          <p>Homestead Rd, Rivonia, Johannesburg</p>
        </div>
      </div>
      <div className="form-bar">
        <form action="#" method="post">
          <label>
            <input type="text" name="name" placeholder="Name" />
          </label>
          <label>
            <input type="email" name="email" placeholder="Email" />
          </label>
          <label>
            <textarea
              name="message"
              cols="30"
              rows="1"
              placeholder="Message"
            ></textarea>
          </label>
        </form>
      </div>
    </div>
  </footer>
)

export default Header
