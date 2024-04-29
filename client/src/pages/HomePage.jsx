import { Link as RouterLink } from "react-router-dom";
import Auth from "../utils/auth";
import NavBar from "../components/Nav/NavBar";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { QUERY_STUDENTS } from "../utils/queries";
import UserCard from "../components/Card/UserCard";
import { Heading, Box, Button, FormControl, FormLabel, Input, VStack, Text, Image as ChakraImage, Link as ChakraLink } from "@chakra-ui/react";
import bgImage from '../assets/splatted-green-blue-orange-color-black-background.jpg';
import bootmateLogo from '../assets/bootmate-logo.png';

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
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
      <Box className="popup">
        <Box className="popup-inner">
          <Heading as="h2">Login</Heading>
          <form onSubmit={handleFormSubmit}>
            <VStack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email:</FormLabel>
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password:</FormLabel>
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Login
              </Button>
            </VStack>
          </form>
          <Button onClick={props.toggle} mt={4} colorScheme="teal">Close</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function HomePage() {
  const { loading, data } = useQuery(QUERY_STUDENTS);
  const students = data?.students || [];

  const searchAll = (event) => {
    event.preventDefault();
    return (
      <Box>
        {loading ? <Box>Loading...</Box> : <UserCard students={students} />}
      </Box>
    );
  };

  const [seen, setSeen] = useState(false);
  const togglePop = () => {
    setSeen(!seen);
  };

  return (
    <Box>
      <ChakraImage src={bgImage} alt="background image" />
      <Box as="section" id="home-page">
        {Auth.loggedIn() ? (
          <>
            <NavBar />
            <Box className="search-container">
              <form onSubmit={searchAll}>
                <FormControl id="search">
                  <Input type="text" placeholder="Search..." name="search" />
                </FormControl>
                <Button type="submit" id="search" className="btn" colorScheme="teal">
                  Search
                </Button>
              </form>
            </Box>
            <Box className="search-results">{searchAll()}</Box>
          </>
        ) : (
          <Box className="container">
            <Box className="logo">
              <ChakraImage src={bootmateLogo} alt="bootMate logo" />
            
            <Box className="login">
              <Button className="btn" id="login" onClick={togglePop} colorScheme="teal">
                Login
              </Button>
              {seen ? <Login toggle={togglePop} /> : null}
              <ChakraLink as={RouterLink} to="/signup">
                <Button className="btn" id="signup" colorScheme="teal">
                  Sign Up
                </Button>
              </ChakraLink>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
