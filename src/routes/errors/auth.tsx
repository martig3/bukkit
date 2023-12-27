import { Title, Text, Container, Center, Flex } from "@mantine/core";

export default function NoInvite() {
  return (
    <Container>
      <Center h={"100vh"}>
        <Flex direction={"column"}>
          <Title>Error Authenticating</Title>
          <Text>There was an error authenticating.</Text>
        </Flex>
      </Center>
    </Container>
  );
}
