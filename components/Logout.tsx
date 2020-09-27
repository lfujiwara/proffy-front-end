import { useContext } from "react";
import Router from "next/router";
import { IconButton } from "@chakra-ui/core";
import { UnlockIcon } from "@chakra-ui/icons";
import AuthContext from "../contexts/AuthContext";

export default function Logout() {
  const authData = useContext(AuthContext);
  const logout = async () => {
    await authData.logout();
    await Router.push("/");
  };
  return (
    <IconButton
      aria-label="logout"
      icon={<UnlockIcon />}
      colorScheme="texts_in_purple_base"
      size="md"
      children={[]}
      onClick={logout}
    />
  );
}
