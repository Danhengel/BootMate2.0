import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_STUDENT } from "../utils/mutations";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Select,
  Container,
  Image as ChakraImage,
} from "@chakra-ui/react";
import bgImage from '../assets/background4.jpg';
import bootmateLogo from '../assets/bootmate-logo.png';

function SignupPage() {
  const [formState, setFormState] = useState({ email: "", password: "", firstName: "", lastName: "", openEmploy: "" });
  const [addStudent] = useMutation(ADD_STUDENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addStudent({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
          openEmploy: formState.openEmploy === "Yes" ? true : false,
        },
      });
      const token = mutationResponse.data.addStudent.token;
      Auth.login(token);
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error state or display error message to user
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
    <Box position="relative" minHeight="100vh">
      <ChakraImage src={bgImage} alt="background image" position="absolute" top="0" left="0" zIndex="-1" width="100%" height="100%" objectFit="cover" />
      <Container maxW="lg" centerContent>
        <Box as="section" id="home-page" zIndex="1">
          <ChakraImage src={bootmateLogo} alt="bootMate logo" />
        </Box>
        <Stack spacing={3} mt={{ base: "50px", md: "-100px" }} alignItems="center">
          <form onSubmit={handleFormSubmit} style={{ width: "100%", maxWidth: "400px" }}>
            <FormControl isRequired>
              <Input
                color="orange" // Set the text color to orange
                focusBorderColor="orange" // Set the focus border color to orange
                placeholder="First Name"
                name="firstName"
                type="text"
                onChange={handleChange} // Ensure handleChange function is correctly linked to onChange event
                required
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                color="orange" // Set the text color to orange
                focusBorderColor="orange" // Set the focus border color to orange
                placeholder="Last Name"
                name="lastName"
                type="text"
                onChange={handleChange} // Ensure handleChange function is correctly linked to onChange event
                required
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                color="orange" // Set the text color to orange
                focusBorderColor="orange" // Set the focus border color to orange
                placeholder="Email"
                name="email"
                type="email"
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                color="orange" // Set the text color to orange
                focusBorderColor="orange" // Set the focus border color to orange
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl isRequired>
              <Select
                focusBorderColor="orange"
                placeholder="Are you open to employment opportunities?"
                name="openEmploy"
                onChange={handleChange}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormControl>

            <Button colorScheme="blackAlpha" type="submit" mt={4} width="100%">
              Submit
            </Button>
          </form>
        </Stack>
      </Container>
    </Box>
  );
}

export default SignupPage;
