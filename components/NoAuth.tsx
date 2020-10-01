import { useRouter } from "next/router";
import { ReactNode, ReactNodeArray, useContext, useEffect } from "react";
import AuthContext, { isAuthenticated } from "../contexts/AuthContext";

export default function NoAuth(props: {
  children: ReactNodeArray | ReactNode;
}) {
  const router = useRouter();
  const authData = useContext(AuthContext);
  if (isAuthenticated(authData)) {
    useEffect(() => {
      router.back();
    }, []);
    return <></>;
  }
  return <>{props.children}</>;
}
