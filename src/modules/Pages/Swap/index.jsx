import React, { useState } from "react";
import {
  Flex,
  Container,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import FieldInput from "../../../components/FieldInput";
import ActionButton from "../../../components/ActionButton";
import GaugeLogo from "../../../assets/gaugeLogo";
import { Formik, Form } from "formik";
import { BsChevronDown } from "react-icons/bs";
import { RiExchangeLine } from "react-icons/ri";
import web3 from "web3";

const Component = ({
  linkBalance,
  gaufBalance,
  buyGaufWithEther,
  buyGaufWithLink,
  ethBalance,
}) => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    const amount = web3.utils.toBN((values.input * 10 ** 18).toString(16));
    await buyGaufWithEther(amount);
  };

  return (
    <Flex
      as="div"
      align="center"
      justify="center"
      color="white"
      direction="column"
      marginTop="20em"
      box-shadow="rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px"
    >
      <Flex
        bg="#111111"
        border="5px solid #A65ADD"
        w="40em"
        h="406px"
        borderRadius="24px"
        align="center"
        justify="center"
        direction="column"
      >
        <Formik
          initialValues={{
            input: "0",
          }}
          onSubmit={(formValues) => submitForm(formValues)}
        >
          {({ values, isSubmitting, errors }) => (
            <Container maxWidth="93%">
              <Form>
                <Flex
                  bg="#3D2C49"
                  borderRadius="10px"
                  w="35em"
                  h="101px"
                  align="center"
                  justify="space-around"
                >
                  <Flex w="70px">
                    <Image src="https://i.imgur.com/l6CKOxR.png" alt="ether" />
                  </Flex>
                  <Flex
                    w="20em"
                    h="61px"
                    bg="#663A82"
                    borderRadius="10px"
                    align="center"
                    justify="center"
                  >
                    <FieldInput name="input" />
                  </Flex>
                  {/* <Menu>
                    <MenuButton as={Button} variant="ghost" ml="-3.5em">
                      <BsChevronDown />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Download</MenuItem>
                      <MenuItem>Create a Copy</MenuItem>
                      <MenuItem>Mark as Draft</MenuItem>
                      <MenuItem>Delete</MenuItem>
                      <MenuItem>Attend a Workshop</MenuItem>
                    </MenuList>
                  </Menu> */}
                </Flex>
                <Flex align="center" justify="center">
                  <Flex
                    bgColor="#3D2C49"
                    w="55px"
                    h="55px"
                    borderRadius="30px"
                    mt="-0.5em"
                    mb="-0.5em"
                  >
                    <RiExchangeLine size={55} color="#A65ADD" />
                  </Flex>
                </Flex>
                <Flex
                  bg="#3D2C49"
                  borderRadius="10px"
                  w="35em"
                  h="101px"
                  align="center"
                  justify="space-around"
                >
                  <Flex w="70px" className="coin">
                    <GaugeLogo />
                  </Flex>
                  <Flex
                    w="20em"
                    h="61px"
                    bg="#663A82"
                    borderRadius="10px"
                    align="center"
                    justify="center"
                  >
                    <FieldInput
                      name="output"
                      values={(values.input / 0.000055556).toFixed(2)}
                      isReadOnly={true}
                    />
                  </Flex>
                  {/* <Menu>
                    <MenuButton as={Button} variant="ghost" ml="-3.5em">
                      <BsChevronDown />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>Download</MenuItem>
                      <MenuItem>Create a Copy</MenuItem>
                      <MenuItem>Mark as Draft</MenuItem>
                      <MenuItem>Delete</MenuItem>
                      <MenuItem>Attend a Workshop</MenuItem>
                    </MenuList>
                  </Menu> */}
                </Flex>
                <Flex marginTop="3em" justify="center" align="center">
                  <ActionButton
                    type="submit"
                    isLoading={isSubmitting}
                    label="Get GAUF"
                  />
                </Flex>
              </Form>
            </Container>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default Component;
