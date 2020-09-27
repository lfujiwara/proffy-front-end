import { Box, Flex, Image, Text } from "@chakra-ui/core";
import { MotionFlex } from "../components/animated";
import Avatar from "../components/Avatar";
import HomeButton from "../components/HomeButton";
import Logout from "../components/Logout";
import ProffyLogo from "../components/ProffyLogo";
import AuthContext from "../contexts/AuthContext";

export default function Home() {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <MotionFlex
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          minHeight="100vh"
          flexDirection="column"
        >
          <Flex
            width="100%"
            flex={["none", "none", "2"]}
            justifyContent="space-around"
            alignItems="center"
            backgroundColor="purple"
            flexDirection="column"
            paddingY="2em"
            paddingX="2em"
          >
            <Flex
              width="100%"
              flex={["none", "none", "2"]}
              justifyContent="space-between"
              alignItems="flex-start"
              flexDirection="row"
              marginBottom="1em"
            >
              <Avatar
                color="texts_in_purple_base"
                alignSelf="flex-start"
                name={auth.userData?.firstName}
              />
              <Logout />
            </Flex>
            <Flex
              width="100%"
              flex={["none", "none", "2"]}
              justifyContent="space-around"
              alignItems="center"
              flexDirection={["column", "column", "column", "row"]}
            >
              <ProffyLogo width={["75%", "50%", "25%"]} />
              <Image src="/images/landing.svg" />
            </Flex>
          </Flex>
          <Flex
            width="100%"
            flex="1"
            flexDirection={["column", "column", "column", "row"]}
            justifyContent={[
              "flex-start",
              "flex-start",
              "flex-start",
              "space-around",
            ]}
            padding="1em"
            alignItems="center"
            backgroundColor="back_background"
          >
            <Box
              fontFamily="titles"
              fontSize="1.25em"
              color="texts_base"
              marginBottom={["1em", "1em", "1em", "0"]}
            >
              <Text>Seja bem-vindo.</Text>
              <Text fontWeight="bold">O que deseja fazer?</Text>
            </Box>
            <Flex
              fontFamily="titles"
              fontSize="1.25em"
              width={["100%", "100%", "100%", "auto"]}
            >
              <HomeButton
                backgroundColor="purple"
                color="texts_in_purple_title"
              >
                <Image
                  src="images/icons/study.svg"
                  marginRight="1em"
                  width="1.5em"
                />
                Estudar
              </HomeButton>
              <Box width="1em" />
              <HomeButton backgroundColor="green" color="texts_in_purple_title">
                <Image
                  src="images/icons/give-classes.svg"
                  marginRight="1em"
                  width="1.5em"
                />
                Dar aulas
              </HomeButton>
            </Flex>
          </Flex>
        </MotionFlex>
      )}
    </AuthContext.Consumer>
  );
}
