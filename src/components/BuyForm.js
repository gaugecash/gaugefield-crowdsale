import React, { Component } from 'react'
import { round } from 'mathjs'

import gaufLogo from '../img/gaugefield_logo.png'
import linkLogo from '../img/ICON_LINK.png'
import ethLogo from '../img/ether-logo.png'

class BuyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0',
      ether: true,
      etherinput: false,
      linkinput: false,
    }
  }

  render() {
    if(!this.state.ether){ 
      return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let Amount
            Amount = (this.input.value * 10 ** 18).toString()
            this.props.buyGaufWithLink(Amount)
          }}>
          <div className="borders2 margin-bot">
            <div>
              <label className="float-left white-color"><b>Link Input:</b></label>
              <span className="float-right white-color">
                Balance: {round(this.props.LinkBalance,2)}
              </span>
            </div>
            <div className="input-group mb-4">
              <input
                type="number"
                min="0.1"
                step='any'
                onChange='setTwoNumberDecimal'
                onChange={(event) => {
                  const Amount = this.input.value.toString()
                  this.setState({output: Amount * 400})
                  if(this.input.value >= 0.1){
                    this.setState({linkinput : true})
                  }else{
                    this.setState({linkinput : false})
                  }
                }}
                ref={(input) => { this.input = input }}
                className="input"
                placeholder="0.0"
                required />
              <div className="dropdown input-group-append">
                  <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={linkLogo} height='28' alt=""/>
                    &nbsp;&nbsp;LINK
                  </button>
                  <div className="dropdown-menu backgrd-dropdown" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item icon-dropdown" type="button" onClick={(event) => {this.setState({ether: true})}}>
                      <img src={ethLogo} height='28' alt=""/>
                      &nbsp;&nbsp;ETH
                    </button>
                  </div>
              </div>
              </div>
            </div>
          <div className="borders2 padding-bot">
              <div>
                <label className="float-left white-color"><b>GaugeField Output:</b></label>
                <span className="float-right white-color">
                  Balance: {round(this.props.GAUfBalance,2)}
                </span>
              </div>
              <div className="input-group mb-2">
                <input
                  type="number"
                  step='any'
                  className="input"
                  placeholder="0.0"
                  value={this.state.output}
                  disabled/>

                <div className="input-group-append">
                  <div className="icon">
                    <img src={gaufLogo} height='32' alt=""/>
                    &nbsp;  GAUF
                  </div>
                </div>
              </div>
            </div>  
            <div className="">
              <div className="rate">
                <span className="float-left white-color">Rate</span>
                <span className="float-right white-color">1 GAUF = 0.0025 LINK</span>
              </div>
            </div>
            <div className="submit-button">
                <div className="col-sm-12 text-center">
                {this.state.linkinput ? <button type="submit" >Get GAUF</button> :
                  <button type="submit"disabled >Get GAUF</button>}
                    </div>
            </div>
          </form>
        )
      }
      else {
        return (
          <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              let Amount
              Amount = (this.input.value * 10 ** 18).toString()
              this.props.buyGaufWithEther(Amount)
            }}>
            <div className="borders2 margin-bot">
              <div>
                <label className="float-left white-color"><b>Ether Input:</b></label>
                <span className="float-right white-color">
                  Balance: {round((this.props.ethBalance),4)}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="number"
                  min="0.003"
                  step='any'
                  onChange='setTwoNumberDecimal'
                  onChange={(event) => {
                    const Amount = this.input.value.toString()
                    this.setState({output: Amount * 18000})
                    if(this.input.value >= 0.003){
                      this.setState({etherinput : true})
                    }else{
                      this.setState({etherinput : false})
                    }
                  }}
                  ref={(input) => { this.input = input }}
                  className="input"
                  placeholder="0.0"
                  required />
                <div className="dropdown input-group-append">
                  <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={ethLogo} height='28' alt=""/>
                    &nbsp;&nbsp;ETH
                  </button>
                  <div className="dropdown-menu backgrd-dropdown" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item icon-dropdown" type="button" onClick={(event) => {this.setState({ether: false})}}>
                      <img src={linkLogo} height='28' alt=""/>
                      &nbsp;&nbsp;LINK
                      <span className="glyphicon glyphicon-envelope azul"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div> 
            <div className="borders2 padding-bot">
              <div>
                <label className="float-left white-color"><b>GaugeField Output:</b></label>
                <span className="float-right white-color">
                  Balance: {round(this.props.GAUfBalance,2)}
                </span>
              </div>
              <div className="input-group mb-2">
                <input
                  type="number"
                  step='any'
                  className="input"
                  placeholder="0.0"
                  value={this.state.output}
                  disabled/>

                <div className="input-group-append">
                  <div className="icon">
                    <img src={gaufLogo} height='32' alt=""/>
                    &nbsp;  GAUF
                  </div>
                </div>
              </div>
            </div>  
            <div className="">
              <div className="rate">
                <span className="float-left white-color">Rate</span>
                <span className="float-right white-color">1 GAUF = 0.000055556 ETH</span>
              </div>
            </div>
            <div className="submit-button">
                <div className="col-sm-12 text-center">
                {this.state.etherinput ? <button type="submit" >Get GAUF</button> :
                  <button type="submit"disabled >Get GAUF</button>}
                    </div>
            </div>
          </form>
        );
      }
    }
  }

export default BuyForm;
