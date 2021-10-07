import React, { useState, useEffect } from "react";
import { Header } from "../../components";
import { Swap } from "../../modules/Pages";
import { Route } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import Web3 from "web3";
import GAUf from "../../abis/gauf.json";
import Link from "../../abis/link.json";
import Crowdsale from "../../abis/crowdsale.json";

import Particles from "react-particles-js";

const Component = () => {
  const [account, setAccount] = useState("");
  const [gauf, setGauf] = useState({});
  const [link, setLink] = useState({});
  const [crowdsale, setCrowdsale] = useState({});
  const [linkBalance, setLinkBalance] = useState("0");
  const [ethBalance, setEthBalance] = useState("0");
  const [gaufBalance, setGaufBalance] = useState("0");
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const loadBlockchainData = async () => {
    const web3 = await loadWeb3();
    const accounts = await web3.eth.getAccounts();
    const walletAddress = accounts[0];
    setAccount(walletAddress);

    const networkId = await web3.eth.net.getId();
    const targetNetwork = process.env.REACT_APP_NETWORK_ID;

    const ethBalance = (await web3.eth.getBalance(walletAddress)) / 10 ** 18;
    setEthBalance(ethBalance);

    window.ethereum.on("accountsChanged", (accounts) => {
      window.location.reload();
    });

    console.log(networkId);
    window.ethereum.on("networkChanged", (networkId) => {
      window.location.reload();
    });

    if (
      targetNetwork == networkId &&
      Object.keys(gauf).length > 0 &&
      Object.keys(link).length > 0
    ) {
      // Load GAUf Balance
      console.log(gauf);
      let GAUfBalance =
        (await gauf.methods.balanceOf(walletAddress).call()) / 10 ** 18;
      setGaufBalance(GAUfBalance.toString());
      console.log(GAUfBalance);

      // Load Link Balance
      let LinkBalance =
        (await link.methods.balanceOf(walletAddress).call()) / 10 ** 18;
      setLinkBalance(LinkBalance.toString());
      console.log(LinkBalance);
    } else if (
      targetNetwork == networkId &&
      Object.keys(gauf).length == 0 &&
      Object.keys(link).length == 0
    ) {
      loadBlockchainData();
    } else {
      window.alert("Select the Ethereum Mainet.");
      //window.location.reload();
    }
    setLoading(false);
  };

  const loadContracts = async () => {
    const web3 = await loadWeb3();
    const gaufToken = new web3.eth.Contract(
      GAUf.abi,
      "0x8ce7386fe7688417885adebcbfc01a5445226b2c"
    );
    const linkToken = new web3.eth.Contract(
      Link.abi,
      "0x514910771AF9Ca656af840dff83E8264EcF986CA"
    );
    const crowdsaleToken = new web3.eth.Contract(
      Crowdsale.abi,
      "0x5a29De37757497cc296db63c5D6Dd85234dbe334"
    );
    setGauf(gaufToken);
    setLink(linkToken);
    setCrowdsale(crowdsaleToken);
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        return new Web3(window.ethereum);
      } catch (error) {
        Promise.reject(error);
      }
    }
    return console.log("falha ao conectar com metamask");
  };

  const buyGaufWithEther = (etherAmount) => {
    crowdsale.methods
      .buyGaufWithEther()
      .send({ value: etherAmount, from: account })
      .once("confirmation", (confirmation, info) => {
        loadBlockchainData();
      })
      .on("error", (error) => {
        console.log("error: " + error);
      });
  };

  const buyGaufWithLink = (linkAmount) => {
    setLoading(true);
    link.methods
      .approve(crowdsale.address, linkAmount)
      .send({ from: account })
      .on("error", (error) => {
        setLoading(false);
      })
      .once("confirmation", (confirmation) => {
        crowdsale.methods
          .buyGaufWithLink(linkAmount)
          .send({ from: account })
          .once("confirmation", (confirmation, info) => {
            loadBlockchainData();
            setLoading(false);
          })
          .on("error", (error) => {
            setLoading(false);
          });
      });
  };

  useEffect(async () => {
    await loadContracts();
    loadBlockchainData();
  }, []);

  return (
    <Grid height="100vh">
      <GridItem rowStart={1} rowEnd={2}>
        <Header account={account} loading={loading} />
      </GridItem>
      <GridItem rowStart={2} rowEnd={10}>
        <Route exact path="/">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Particles
              params={{
                particles: {
                  number: {
                    value: 100,
                    density: {
                      enable: true,
                      value_area: 1500,
                    },
                  },
                  color: {
                    value: "#A65ADD",
                  },
                  line_linked: {
                    enable: true,
                    opacity: 0.1,
                  },
                  move: {
                    direction: "right",
                    speed: 0.05,
                  },
                  size: {
                    value: 2,
                  },
                  opacity: {
                    anim: {
                      enable: true,
                      speed: 1,
                      opacity_min: 0.05,
                    },
                  },
                },
                interactivity: {
                  events: {
                    onclick: {
                      enable: true,
                      mode: "push",
                    },
                  },
                  modes: {
                    push: {
                      particles_nb: 1,
                    },
                  },
                },
                retina_detect: true,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Swap
                linkBalance={linkBalance}
                gaufBalance={gaufBalance}
                buyGaufWithEther={buyGaufWithEther}
                buyGaufWithLink={buyGaufWithLink}
                ethBalance={ethBalance}
              />
            </div>
          </div>
        </Route>
      </GridItem>
    </Grid>
  );
};

// const PrivateRoute = ({ Component, ...rest }) => {
//     const authToken = useSelector((state) => state.auth.authToken)
//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 authToken ? <Component {...props} /> : <NotFoundPage />
//             }
//         />
//     )
// }

export default Component;
