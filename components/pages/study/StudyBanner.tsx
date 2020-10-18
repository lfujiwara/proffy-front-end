import { Flex, Text } from "@chakra-ui/core";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUsersController } from "../../../backend-api/UsersController";
import IUser from "../../../models/IUser";

const MotionText = motion.custom(Text);

export default function StudyBanner() {
  const usersController = useUsersController();
  const [state, setState] = useState({
    count: -1,
  });

  const fetchProffys = async () => {
    const count = await usersController.countProffys();
    setState({ count: count });
  };

  useEffect(() => {
    fetchProffys();
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      padding="2em"
      minHeight="300px"
      backgroundColor="purple"
    >
      <Flex
        maxWidth="4xl"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontFamily="titles"
          fontSize="2.25em"
          fontWeight="bold"
          maxWidth="360px"
          color="texts_in_purple_title"
        >
          Estes são os proffys disponíveis.
        </Text>
        {state.count !== -1 && (
          <MotionText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transitionDuration="1"
            fontSize="0.75em"
            color="texts_in_purple_base"
          >
            <Text>
              Temos {state.count} proffy{state.count === 1 ? "" : "s"}!
            </Text>
          </MotionText>
        )}
      </Flex>
    </Flex>
  );
}
