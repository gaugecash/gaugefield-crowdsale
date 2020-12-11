import React, { Component } from 'react'
import Identicon from 'identicon.js';
import gaufLogo from '../img/logos_gaugefield_horizontal.png'

class Navbar extends Component {

  render() {
    return (
      // <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-2 shadow ">
      <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-2 top-bar">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0 "
          href="http://www.gaugecash.com"
          target="_blank"
          rel="noopener noreferrer"
        >
        <img src={gaufLogo} height="100" alt="logo" className="margin-right" />
          {/* GaugeField Crowdsale */}
        </a>

        {!this.props.account ? <div id="loader" className="text-light" role="status"></div> :
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block boulas-regular negative-margin-topper">
            <a
              className="text-white"
              href={"https://etherscan.io/address/" + this.props.account}
              target="_blank"
              rel="noopener noreferrer"
            >
              {(this.props.account)}
            </a>&nbsp;
          </li>
        }
      </nav>
    );
  }
}

export default Navbar;
