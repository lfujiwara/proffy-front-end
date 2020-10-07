import { useRouter } from "next/router";
import { ReactNode, ReactNodeArray, useEffect, useState } from "react";
import AuthContext, {
  AuthContextDefaultValue,
  cookieLogin,
  credentialsLogin,
  fetchUserData,
  IAuthContextValue,
  isAuthenticated,
  logout,
} from "../contexts/AuthContext";

export default function AuthProvider(props: {
  children: ReactNodeArray | ReactNode;
}) {
  const router = useRouter();
  const [authData, setAuthData] = useState<IAuthContextValue>(
    AuthContextDefaultValue
  );

  const authCredentialsLogin = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const data = await credentialsLogin(email, password, rememberMe);
    const userData = await fetchUserData(data.accessToken);
    const nextAuthData = { ...authData, ...data, userData };

    if (isAuthenticated(nextAuthData)) {
      setAuthData(nextAuthData);
      return true;
    }

    return false;
  };

  const authCookieLogin = async () => {
    try {
      const data = await cookieLogin();
      const userData = await fetchUserData(data.accessToken);
      const nextAuthData = { ...authData, ...data, userData };

      if (isAuthenticated(nextAuthData)) {
        setAuthData(nextAuthData);
        return true;
      }
    } catch {}
    setAuthData(AuthContextDefaultValue);
    return false;
  };

  const authLogout = async () => {
    await logout();
    setAuthData(AuthContextDefaultValue);
  };

  const getAccessToken = async (redirectIfNotAuthenticated = true) => {
    if (!isAuthenticated(authData)) {
      try {
        await authCookieLogin();
      } catch (err) {
        if (err?.request?.status == 401)
          router.push("/", { query: { backTo: router.pathname } });
      }
      if (!isAuthenticated(authData))
        router.push("/", { query: { backTo: router.pathname } });
    }
    return authData.accessToken;
  };

  useEffect(() => {
    if (!isAuthenticated(authData)) authCookieLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authData,
        credentialsLogin: authCredentialsLogin,
        cookieLogin: authCookieLogin,
        logout: authLogout,
        getAccessToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
