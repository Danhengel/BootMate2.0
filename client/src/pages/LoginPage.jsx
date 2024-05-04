import { Link as RouterLink } from "react-router-dom";
import Auth from "../utils/auth";
import NavBar from "../components/Nav/NavBar";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { Box, Button, FormControl, Input, Flex, Image as ChakraImage, Link as ChakraLink } from "@chakra-ui/react"; // Import Link as ChakraLink
import bgImage from '../assets/background4.jpg';
import bootmateLogo from '../assets/bootmate-logo.png';

function Login() { // Removed unnecessary props parameter
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { loading }] = useMutation(LOGIN); // Destructure loading from useMutation

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = data.login.token;
      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

    return (
      
      <Box className="container" style={{ backgroundImage: `url(${bgImage})` }}>
        <Heading fontFamily='Consolas' as="h2">Login:</Heading>
        <form onSubmit={handleFormSubmit}>
          <VStack spacing={4}>
            <FormControl id="email">
              <Input
                placeholder="Email Address"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <Input
                placeholder="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
            </FormControl>
            <Flex justifyContent="center">
              <Button type="submit" colorScheme="blackAlpha">
                Login
              </Button>
              <Button onClick={props.toggle} ml={4} colorScheme="blackAlpha">
                Close
              </Button>
            </Flex>
          </VStack>
        </form>
      </Box>
    );
}

export default Login;
