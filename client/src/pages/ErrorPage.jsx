import {Button, ButtonGroup, Container, Heading, Text, Box, Stack, InputGroup, InputLeftElement, Flex, Link,  } from "@chakra-ui/react";
import { useRouteError } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
      <Box
      style={{
          backgroundImage: "url('client/src/assets/background.jpg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh', 
      }}
  >
      <Container
          maxW='lg'
          centerContent
      >
          <Stack direction="row" spacing='75px' fontSize='25px' p={4} color="white">
              <Link href="/home">Home</Link>
              <Link href="/profile">Sign In </Link>
              <Link href="/home">Log Out</Link>
          </Stack>
          <Heading color='white' mt="px" mb='10px' fontSize='150px'>bootMate () </Heading>
          <Heading color='white' mt="25px" mb='10px' fontSize='50px'>{"<{ Connect, Collaborate, Code >}"} </Heading>
          
          <Stack color='white' spacing={3}>
          <form onSubmit={handleFormSubmit}>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
              </InputLeftElement>
              <Flex direction="column" justify="center" align="center">
              <RouterLink to="/SignupPage.jsx">
                          <Stack direction='column'>
                              <   Box
                                  display='flex'
                                  alignItems='center'
                                  justifyContent='center'
                                  width='100%'
                                  py={12}
                                  bgPosition='center'
                                  bgRepeat='no-repeat'
                                  mb={2}
                              >
                                  <ButtonGroup gap='3'>
                                      <Button colorScheme='whiteAlpha'>Sign Up</Button>
                                  </ButtonGroup>
                              </Box>
                          </Stack>
                      </RouterLink>
                <RouterLink to="/HomePage.jsx">
                          <Stack direction='column'>
                              <   Box
                                  display='flex'
                                  alignItems='center'
                                  justifyContent='center'
                                  width='100%'
                                  py={12}
                                  bgPosition='center'
                                  bgRepeat='no-repeat'
                                  mb={2}
                              >
                                  <ButtonGroup gap='3'>
                                      <Button colorScheme='whiteAlpha'>Log In</Button>
                                  </ButtonGroup>
                              </Box>
                          </Stack>
                      </RouterLink>
              </Flex>
            </InputGroup>
          </form>
        </Stack>
      </Container>
  </Box>
    );
  }