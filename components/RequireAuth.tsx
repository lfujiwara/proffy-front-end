import { useRouter } from "next/router";
import { ReactNode, ReactNodeArray, useContext } from "react";
import AuthContext, { isAuthenticated } from "../contexts/AuthContext";

export default function RequireAuth(props: {
  children: ReactNodeArray | ReactNode;
}) {
  const router = useRouter();
  const authData = useContext(AuthContext);

  if (!isAuthenticated(authData) && typeof window !== "undefined")
    router.push({ pathname: "/", query: { backTo: router.pathname } });

  return isAuthenticated(authData) ? <>{props.children}</> : <></>;
}
