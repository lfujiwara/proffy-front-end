import { ChakraProvider } from "@chakra-ui/core";
import type { AppProps } from "next/app";
import Router from "next/router";
import theme from "../styles/theme";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import AuthContext, {
  AuthContextDefaultValue,
  cookieLogin,
  credentialsLogin,
  fetchUserData,
  IAuthContextValue,
  isAuthenticated,
  logout,
} from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [authData, setAuthData] = useState<IAuthContextValue>(
    AuthContextDefaultValue
  );

  const authCredentialsLogin = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      const data = await credentialsLogin(email, password, rememberMe);
      const userData = await fetchUserData(data.accessToken);
      const nextAuthData = { ...authData, ...data, userData };

      if (isAuthenticated(nextAuthData)) {
        setAuthData(nextAuthData);
        await Router.push("/home");
        return;
      }
    } catch (error) {}
  };

  const authCookieLogin = async () => {
    try {
      const data = await cookieLogin();
      const userData = await fetchUserData(data.accessToken);
      const nextAuthData = { ...authData, ...data, userData };

      if (isAuthenticated(nextAuthData)) {
        setAuthData(nextAuthData);
        await Router.push("/home");
        return;
      }
    } catch {}
    await Router.push("/");
  };

  const authLogout = async () => {
    await logout();
    setAuthData(AuthContextDefaultValue);
  };

  useEffect(() => {
    if (!isAuthenticated(authData)) authCookieLogin();
  }, [authData]);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <AuthContext.Provider
        value={{
          ...authData,
          credentialsLogin: authCredentialsLogin,
          cookieLogin: authCookieLogin,
          logout: authLogout,
        }}
      >
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
