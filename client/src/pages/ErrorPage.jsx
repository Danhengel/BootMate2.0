import {Button, ButtonGroup, Container, Heading, Text, Box, } from "@chakra-ui/react";
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container maxW='lg'  centerContent>
    <Heading mt="100px" mb='40px' fontSize='6xl'>BootMate()</Heading>
    <Text fontSize='1xl'p='15'>An error has occured within the</Text>
    <Text fontSize='1xl'p='15'>application.</Text>
    <Text fontSize='1xl'p='15'>Please select the reload button</Text>
    <Text fontSize='1xl'p='15'>to be routed back to</Text>
    <Text fontSize='1xl'p='15'>the home page.</Text>
<Box>
    <ButtonGroup gap='4'>
  <Button colorScheme='blackAlpha'>Reload</Button>
</ButtonGroup>
</Box>

    </Container>
)
}