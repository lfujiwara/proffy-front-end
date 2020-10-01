import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useContext, useEffect } from "react";
import { useUsersController } from "../backend-api/UsersController";
import { MotionFlex } from "../components/animated";
import AuthProvider from "../components/AuthProvider";
import TopBar from "../components/TopBar";
import AuthContext from "../contexts/AuthContext";

const avatarUrl = "images/icons/avatar.png";

export default function Profile() {
  const authData = useContext(AuthContext);
  const usersController = useUsersController();

  const fetchData = async () => {
    try {
      console.log(await usersController.me());
    } catch {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthProvider>
      <MotionFlex
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        backgroundColor="back_background"
        flexDirection="column"
        minHeight="100vh"
      >
        <TopBar />
        <Flex
          backgroundColor="purple"
          alignItems="center"
          justifyContent="center"
          paddingX="2em"
          paddingY="4em"
        >
          <Box>
            <Image
              boxSize="150px"
              src={avatarUrl}
              shadow="md"
              borderRadius="full"
            />
            <Text fontWeight="bold" fontFamily="titles"></Text>
          </Box>
        </Flex>
      </MotionFlex>
    </AuthProvider>
  );
}
