import { Link as RouterLink } from "react-router-dom";
import Auth from "../utils/auth";
import NavBar from "../components/Nav/NavBar";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENTS } from "../utils/queries";
import UserCard from "../components/Card/UserCard";
import { Box, Button, FormControl, Flex, Input, Image as ChakraImage, Link as ChakraLink, Center } from "@chakra-ui/react";
import bgImage from '../assets/background4.jpg';
import bootmateLogo from '../assets/bootmate-logo.png';

export default function HomePage() {
  const { loading, data } = useQuery(QUERY_STUDENTS);
  const students = data?.students || [];

  const [searchResults, setSearchResults] = useState([]);

  const searchAll = (event) => {
    event.preventDefault();
    // Perform search here and update searchResults state
    // For simplicity, let's just filter the students array for now
    const searchTerm = event.target.search.value.toLowerCase();
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredStudents);
  };

  const [seen, setSeen] = useState(false);
  const togglePop = () => {
    setSeen(!seen);
  };

  return (
    <Box position="relative" minHeight="100vh">
      <ChakraImage src={bgImage} alt="background image" position="absolute" top="0" left="0" zIndex="-1" width="100%" height="100%" objectFit="cover" />
      <Box as="section" id="home-page" zIndex="1">
        {Auth.loggedIn() ? (
          <>
            <NavBar />
            <Box className="search-container">
              <form onSubmit={searchAll}>
                <FormControl id="search">
                  <Input type="text" placeholder="Search..." name="search" />
                </FormControl>
                <Button type="submit" id="search" className="btn" colorScheme="blackAlpha">
                  Search
                </Button>
              </form>
            </Box>
            <Box className="search-results">
              {loading ? <Box>Loading...</Box> : <UserCard students={searchResults.length > 0 ? searchResults : students} />}
            </Box>
          </>
        ) : (
          <Box className="container" textAlign="center">
            <Box className="logo" mt="-110">
              <ChakraImage src={bootmateLogo} alt="bootMate logo" />
              {seen ? <Login toggle={togglePop} /> : null}
            <Flex justifyContent="center">
              <ChakraLink as={RouterLink} to="/login">
                <Button className="btn" id="login" colorScheme="blackAlpha" onClick={() => setSeen(true)}>
                  Login
                </Button>
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/signup">
                <Button className="btn" id="signup" colorScheme="blackAlpha" ml="4">
                  Sign Up
                </Button>
              </ChakraLink>
            </Flex>
            </Box>
           
          </Box>
        )}
      </Box>
    </Box>
  );
}
