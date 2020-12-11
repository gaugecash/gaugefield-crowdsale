import React, { Component } from 'react'
import BuyForm from './BuyForm'
import gaugeFieldLogo from '../img/logos_gaugefield_vertical.png'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy'
    }
  }

  render() {
    let content
    {
      content = <BuyForm
      LinkBalance={this.props.LinkBalance}
      GAUfBalance={this.props.GAUfBalance}
      buyGaufWithEther={this.props.buyGaufWithEther}
      buyGaufWithLink={this.props.buyGaufWithLink}
      ethBalance={this.props.ethBalance}
      />
    }
    return (
      <div id="content " className="mt-3">
        <div className="card mb-4 margin-topper buy-background" >
        <div className="container-div ">
        <img src={gaugeFieldLogo} width="35%" alt="" className="center"/>
        </div>
          <div className="card-body">
            {content}
          </div>
        </div>
        <div className= 'container-div'>
          <a
            className="link-text"
            href={"https://etherscan.io/address/0x5a29de37757497cc296db63c5d6dd85234dbe334"}
            target="_blank"
            rel="noopener noreferrer">
              Contract address
          </a>
        </div>
        <div className= 'center-link'>
          <a
            className="link-text"
            href={"https://metamask.zendesk.com/hc/en-us/articles/360015489031"}
            target="_blank"
            rel="noopener noreferrer">
              Add GAUF to Metamask
          </a>
        </div>
      </div>
    );
  }
}

export default Main;
