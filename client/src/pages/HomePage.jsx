import { Link as RouterLink } from "react-router-dom";
import Auth from "../utils/auth";
import NavBar from "../components/Nav/NavBar";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { QUERY_STUDENTS } from "../utils/queries";
import UserCard from "../components/Card/UserCard";
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Image, Link as ChakraLink } from "@chakra-ui/react";

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
                id="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password:</FormLabel>
              <Input
                placeholder="Password"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" onClick={Login} colorScheme="teal">
              Login
            </Button>
          </VStack>
        </form>
        <Button onClick={props.toggle} mt={4} colorScheme="teal">Close</Button>
      </Box>
    </Box>
  );
}

export default function HomePage() {
  const { loading, data } = useQuery(QUERY_STUDENTS);
  const students = data?.students || [];

  const searchAll = () => {
    return (
      <Box>
        {loading ? <Box>Loading...</Box> : <UserCard students={students} />}
      </Box>
    );
  };

  const [seen, setSeen] = useState(false);
  function togglePop() {
    setSeen(!seen);
  }

    return (
      <Box as="section" id="home-page">
        {Auth.loggedIn() ? (
          <>
            <NavBar />
            <Box className="container">
              <Image src="./assets/bootmate_logo.png" alt="bootMate() logo" />
              <Heading as="h1">What are you waiting for?</Heading>
              <Heading as="h2">Search for projects to join or create your own!</Heading>
    
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
            </Box>
          </>
        ) : (
          <Box className="container">
            <Heading as="h1">Welcome to bootMate()</Heading>
    
            <Heading as="h2" id="subtag">Connect. Collaborate. Create</Heading>
            <Box className="text">
              <Text id="description">
                bootMate() is a platform for developers to connect and collaborate
                on projects.
                <br></br>
                <br></br>
                Connect, Collaborate, Code
              </Text>
              <Heading as="h4" id="subtext">Login or Sign up today to get started!</Heading>
            </Box>
    
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
        )}
      </Box>
      );
    }
