import React, { Component } from 'react'
import { GrTransaction } from "react-icons/gr"

class Popup extends Component {

  render() {
    if (!this.props.show) {
        return null;
    }

    return (
        <div className="popup">
          <div class="transaction-icon">
            <GrTransaction />
          </div>
          <span>Transaction Confirmed</span>
          <a href={this.props.etherscan} target="_blank" rel="noopener noreferrer">View on Etherscan </a>
          <button onClick={this.props.closePopup}>Close</button>
        </div>
    );
  }
}

export default Popup;
