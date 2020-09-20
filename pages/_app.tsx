import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import type { AppProps } from "next/app";
import theme from "../styles/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
