import { Title, Text, Container, Center, Flex } from "@mantine/core";

export default function NoInvite() {
  return (
    <Container>
      <Center h={"100vh"}>
        <Flex direction={"column"}>
          <Title>No Invite</Title>
          <Text>Your email has not recieved an invite.</Text>
        </Flex>
      </Center>
    </Container>
  );
}
