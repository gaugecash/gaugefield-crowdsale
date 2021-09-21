import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Flex, Image } from "@chakra-ui/react";
import { BiWallet } from "react-icons/bi";

const Component = ({ account, loading }) => {
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem 4rem"
        bg="#111111"
        color="white"
        boxShadow="0px 8px 32px rgba(84, 81, 81, 0.1)"
        height="185px"
        w="100%"
        data-testid="header-nav"
        position="absolute"
        zIndex="10000"
      >
        <Flex align="center" mr={5}>
          <Link to="/">
            <Image
              src="https://i.imgur.com/spx5345.png"
              alt="GaugeHorizontal"
              w="545px"
            />
          </Link>
        </Flex>
        <Flex direction="column" align="center">
          {!account && (
            <Flex
              border="1px solid white"
              w="80px"
              h="80px"
              justify="center"
              align="center"
              borderRadius="100px"
              _hover={{
                bgColor: "white",
                transition: "1.2s",
                color: "black !important",
                cursor: "pointer",
              }}
            >
              <BiWallet size={40} />
            </Flex>
          )}
          {account && <Flex>Account: {account}</Flex>}
        </Flex>
      </Flex>
    </>
  );
};

Component.displayName = "Header";
export default withRouter(Component);
