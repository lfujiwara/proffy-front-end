import { Flex, IconButton } from "@chakra-ui/core";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { MotionBox } from "../components/animated";
import NoAuth from "../components/NoAuth";
import ConfirmRegistrationForm from "../components/pages/confirm-registration/ConfirmRegistrationForm";
import RegisterForm from "../components/pages/register/RegisterForm";
import SuccessBanner from "../components/SuccessBanner";
import ProffyBanner from "../components/ProffyBanner";

export default function ConfirmRegistration(props: { query: any }) {
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  return (
    <NoAuth>
      <Head>
        <title>Proffy - Confirmação de cadastro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showSuccessBanner ? (
        <SuccessBanner
          title="Cadastro concluído"
          text="Você já pode fazer login."
        />
      ) : (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          display="flex"
          minHeight="100vh"
          alignItems="stretch"
          flexDirection={["column", "column", "column", "row"]}
        >
          <Flex
            flex={["0", "0", "0", "1"]}
            justifyContent="center"
            alignItems="center"
            backgroundColor="purple"
            paddingX="1em"
            paddingY="2em"
            overflow="hidden"
          >
            <ProffyBanner />
          </Flex>
          <Flex
            flex={["0", "0", "0", "1"]}
            paddingX="1em"
            paddingY="2em"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            position="relative"
            backgroundColor="back_background"
          >
            <ConfirmRegistrationForm
              query={props.query}
              onSuccess={() => setShowSuccessBanner(true)}
            />
          </Flex>
        </MotionBox>
      )}
      <IconButton
        onClick={() => Router.push("/")}
        colorScheme={showSuccessBanner ? "texts_in_purple_base" : "purple"}
        size="lg"
        icon={<ArrowBackIcon />}
        position="absolute"
        top="0"
        left="0"
      />
    </NoAuth>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query ?? null,
    },
  };
}
