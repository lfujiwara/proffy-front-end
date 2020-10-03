import { useRouter } from "next/router";
import { ReactNode, ReactNodeArray, useContext, useEffect } from "react";
import AuthContext, { isAuthenticated } from "../contexts/AuthContext";

export default function NoAuth(props: {
  children: ReactNodeArray | ReactNode;
}) {
  const router = useRouter();
  const authData = useContext(AuthContext);
  useEffect(() => {
    if (isAuthenticated(authData))
      router.push({
        pathname: router.query.backTo
          ? router.query.backTo.toString()
          : "/home",
      });
  }, []);
  return isAuthenticated(authData) ? <></> : <>{props.children}</>;
}
