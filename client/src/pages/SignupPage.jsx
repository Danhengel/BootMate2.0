import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_STUDENT } from "../utils/mutations";
import {
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
  Image as ChakraImage,
  Link as ChakraLink,
  Container,
  Stack,
  InputGroup,
  InputLeftElement,
  ButtonGroup,
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
    <Box>
    <ChakraImage src={bgImage} alt="background image" />
    <Container maxW="lg" centerContent>
      <Box className="logo" mt="-250px"> {/* Adjust margin-top here */}
        <ChakraImage src={bootmateLogo} alt="bootMate logo" />
      </Box>
      <Box className="container" style={{ backgroundImage: `url(${bgImage})` }}>
        <Box className="popup-inner" mt="100px">
          <Heading mt="50px" fontSize="3xl"> {/* Adjust margin-top here */}
            Sign Up
              </Heading>
              <Stack spacing={3}>
                <div className="signup-page">
                  <form onSubmit={handleFormSubmit}>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        id="firstName"
                        onChange={handleChange}
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        id="lastName"
                        onChange={handleChange}
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        placeholder="Email"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <select
                        name="openEmploy"
                        id="openEmploy"
                        onChange={handleChange}
                      >
                        <option value="">Are you open to employment opportunities?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </InputGroup>

                    <Button colorScheme="blackAlpha" type="submit">
                    Submit
                  </Button>
                </form>
              </div>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;