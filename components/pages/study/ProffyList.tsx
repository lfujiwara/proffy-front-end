import { Flex, FlexProps } from "@chakra-ui/core";
import { useEffect, useState } from "react";
import { useUsersController } from "../../../backend-api/UsersController";
import IUser from "../../../models/IUser";
import ProffyCard from "./ProffyCard";

export default function ProffyList(props: FlexProps) {
  const usersController = useUsersController();
  const [proffys, setProffys] = useState<IUser[]>([]);

  const fetchProffys = () => {
    usersController.listProffys().then(setProffys);
  };

  useEffect(fetchProffys, []);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth="4xl"
      {...props}
    >
      {proffys.map((proffy) => (
        <ProffyCard proffy={proffy} />
      ))}
    </Flex>
  );
}
