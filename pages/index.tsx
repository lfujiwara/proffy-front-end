import { Box, Flex, PseudoBox, Text } from "@chakra-ui/core";
import Head from "next/head";
import LoginForm from "../components/LoginForm";
import ProffyBanner from "../components/ProffyBanner";

export default function Home() {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="stretch"
      flexDirection={["column", "column", "column", "row"]}
    >
      <Head>
        <title>Proffy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flex={["0", "0", "0", "1"]}
        justifyContent="center"
        alignItems="center"
        backgroundColor="purple"
        paddingY="2em"
        overflow="hidden"
      >
        <ProffyBanner />
      </Flex>
      <Flex
        flex={["0", "0", "0", "1"]}
        paddingY="2em"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        position="relative"
      >
        <LoginForm width="100%" maxWidth="25em" />
        <Box height="1em" />
        <Flex width="100%" maxWidth="25em">
          <a href="#">
            <PseudoBox
              as={Text}
              _hover={{ textDecoration: "underline" }}
              color="purple"
              fontWeight="bold"
            >
              Cadastrar-se
            </PseudoBox>
          </a>
        </Flex>
      </Flex>
    </Box>
  );
}
