import { ChakraProvider } from "@chakra-ui/core";
import type { AppProps } from "next/app";
import AuthProvider from "../components/AuthProvider";
import "../styles/globals.css";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
