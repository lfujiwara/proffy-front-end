import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { useContext } from "react";
import { MotionFlex } from "../components/animated";
import ProfileForm from "../components/pages/profile/ProfileForm";
import RequireAuth from "../components/RequireAuth";
import TopBar from "../components/TopBar";
import AuthContext from "../contexts/AuthContext";

const avatarUrl = "images/icons/avatar.png";

export default function Profile() {
  const authData = useContext(AuthContext);

  return (
    <RequireAuth>
      <MotionFlex
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        backgroundColor="back_background"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        paddingBottom="2em"
      >
        <TopBar title="Meu perfil" />
        <Flex
          flexDirection="column"
          background="url('images/success-background.svg')"
          backgroundPosition="center"
          backgroundSize="auto 100%"
          backgroundRepeat="space"
          backgroundColor="purple"
          alignItems="center"
          justifyContent="center"
          alignSelf="stretch"
          paddingX="2em"
          paddingY="4em"
        >
          <Image
            boxSize="150px"
            src={avatarUrl}
            shadow="md"
            borderRadius="full"
            marginBottom="2em"
          />
          <Text
            fontSize="2.25em"
            fontWeight="bold"
            fontFamily="titles"
            textAlign="center"
            color="texts_in_purple_title"
          >
            {authData.userData?.firstName} {authData.userData?.lastName}
          </Text>
          <Text
            fontSize="1.5em"
            textAlign="center"
            color="texts_in_purple_base"
          >
            {authData.userData?.subjectId}
          </Text>
        </Flex>
        <ProfileForm />
      </MotionFlex>
    </RequireAuth>
  );
}
