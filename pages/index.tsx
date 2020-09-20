import { Box, Text } from "@chakra-ui/core";
import Head from "next/head";

export default function Home() {
  return (
    <Box
      backgroundColor="another_purple"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>Proffy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text color="texts_in_purple_title">Hello, world!</Text>
    </Box>
  );
}
