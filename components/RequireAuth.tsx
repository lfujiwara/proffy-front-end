import { useRouter } from "next/router";
import { ReactNode, ReactNodeArray, useContext, useEffect } from "react";
import AuthContext, { isAuthenticated } from "../contexts/AuthContext";

export default function RequireAuth(props: {
  children: ReactNodeArray | ReactNode;
}) {
  const router = useRouter();
  const authData = useContext(AuthContext);
  if (isAuthenticated(authData)) {
    return <>{props.children}</>;
  }

  useEffect(() => {
    router.push({ pathname: "/", query: { backTo: router.pathname } });
  }, []);
  return <></>;
}
