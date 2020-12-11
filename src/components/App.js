import React, { Component } from 'react'
import Web3 from 'web3'

import GAUf from '../abis/GAUf.json'
import Link from '../abis/Link.json'
import Crowdsale from '../abis/Crowdsale.json'


import Navbar from './Navbar'
import Main from './Main'
import Popup from './Popup'
import './App.css'

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId =  await web3.eth.net.getId()
    const mainNetwork = 1

    const ethBalance = await web3.eth.getBalance(this.state.account) / 10 ** 18
    this.setState({ ethBalance })

    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload();
    })

    window.ethereum.on('networkChanged', function (networkId) {
      window.location.reload();
    })

    if(mainNetwork == networkId) {

      // Load GAUf
      const gauf = new web3.eth.Contract(GAUf.abi, '0x8ce7386fe7688417885adebcbfc01a5445226b2c')
      this.setState({ gauf })
      let GAUfBalance = await gauf.methods.balanceOf(this.state.account).call() / 10 ** 18
      this.setState({ GAUfBalance: GAUfBalance.toString() })
    
      // Load Link
      const link = new web3.eth.Contract(Link.abi, '0x514910771AF9Ca656af840dff83E8264EcF986CA')
      this.setState({ link })
      let LinkBalance = await link.methods.balanceOf(this.state.account).call() / 10 ** 18
      this.setState({ LinkBalance : LinkBalance.toString() })

      // Load Crowdsale
      const crowdsale = new web3.eth.Contract(Crowdsale.abi, '0x5a29De37757497cc296db63c5D6Dd85234dbe334')
      this.setState({ crowdsale })

    } else {
      window.alert('Select the Ethereum Mainet.')
      window.location.reload();
    }
    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask to use this page.')
      window.location.reload();
    }
  }
  
  buyGaufWithEther = (etherAmount) => {
    this.setState({ loading: true })
    this.state.crowdsale.methods.buyGaufWithEther().send({ value: etherAmount, from: this.state.account })
    .once('confirmation', (confirmation, info) => {
      this.loadBlockchainData()
      this.setState({ loading: false })
      this.togglePopup(info["transactionHash"])
    })
    .on("error", (error) => {
      this.setState({ loading: false })
    })
  }

  buyGaufWithLink = (linkAmount) => {
    this.setState({ loading: true })
    this.state.link.methods.approve(this.state.crowdsale.address, linkAmount).send({ from: this.state.account })
      .on("error", (error) => {
        this.setState({ loading: false })
      })
      .once('confirmation', (confirmation) => {
        this.state.crowdsale.methods.buyGaufWithLink(linkAmount).send({ from: this.state.account })
          .once('confirmation', (confirmation,info) => {
            this.loadBlockchainData()
            this.setState({ loading: false })
            this.togglePopup(info["transactionHash"])
          })
          .on("error", (error) => {
              this.setState({ loading: false })
          }
        )
      }
    )
  }

  togglePopup(hash) {  
    this.setState({  
      showPopup: !this.state.showPopup, 
      transactionHash: hash
    });
  }  

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      gauf: {},
      link: {},
      crowdsale: {},
      LinkBalance: '0',
      ethBalance: '0',
      GAUfBalance: '0',
      loading: true,
      showPopup: false,
      transactionHash: '',
    }
  }

  render() {
    let load
    let content

    if(this.state.loading) {
      load = 
      <div className="load">
        <div className="spinner-border white-color" role="status">
        </div>
      </div>
    }
  
    content = 
      <Main
      LinkBalance={this.state.LinkBalance}
      GAUfBalance={this.state.GAUfBalance}
      buyGaufWithEther={this.buyGaufWithEther}
      buyGaufWithLink={this.buyGaufWithLink}
      ethBalance={this.state.ethBalance}
      />

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto ">
                <a
                  href="http://www.gaugecash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {load}
                {content}
                
              </div>
            </main>
          </div>
        </div>
        <Popup show={this.state.showPopup} closePopup={this.togglePopup.bind(this)} etherscan={"https://etherscan.io/tx/"+this.state.transactionHash}/>
      </div>
    );
  }
}

export default App;
