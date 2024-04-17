import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_STUDENT } from "../utils/mutations";
import {
  ButtonGroup,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  RadioGroup,
  Radio,
  Stack,
  Container,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";

function SignupPage() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addStudent] = useMutation(ADD_STUDENT);

  const [file, setFile] = useState({ image: "" });
  function handleUpload(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

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
          image: file.image,
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
    <section>
      <Container maxW="lg" centerContent>
        <Heading mt="50px" mb="20px" fontSize="6xl">
          BootMate()
        </Heading>
        <Heading mt="50px" mb="20px" fontSize="3xl">
          Sign Up
        </Heading>
        <Stack spacing={3}>
          <div className="signup-page">
            <form onSubmit={handleFormSubmit}>
              {/* <InputGroup>
                <Text fontSize="2xl" p="5">
                  Upload Profile Picture
                </Text>
                <Input
                  name="image"
                  type="file"
                  id="image"
                  onChange={handleUpload}
                />
                <img id="upload-preview" src={file} />
              </InputGroup> */}

              <InputGroup>
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  placeholder="First Name"
                  name="firstName"
                  type="firstName"
                  id="firstName"
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  placeholder="Last Name"
                  name="lastName"
                  type="lastName"
                  id="lastName"
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <select
                  name="openEmploy"
                  id="openEmploy"
                  onChange={handleChange}
                >
                  <option value="">Are you open to employment oppurtunities?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </InputGroup>

              <Container maxW="lg" centerContent>
                <Box>
                  <ButtonGroup gap="4">
                    <Button colorScheme="blackAlpha" type="submit">
                      Submit
                    </Button>
                  </ButtonGroup>
                </Box>
              </Container>
            </form>
          </div>
        </Stack>
      </Container>
    </section>
  );
}

export default SignupPage;