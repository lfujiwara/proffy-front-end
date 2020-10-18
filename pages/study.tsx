import { Flex, Text } from "@chakra-ui/core";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUsersController } from "../backend-api/UsersController";
import ProffyList from "../components/pages/study/ProffyList";
import StudyBanner from "../components/pages/study/StudyBanner";
import TopBar from "../components/TopBar";
import IUser from "../models/IUser";

export default function StudyPage() {
  return (
    <Flex
      flexDirection="column"
      backgroundColor="back_background"
      minHeight="100vh"
    >
      <TopBar title="Estudar" />
      <StudyBanner />
      <ProffyList alignSelf="center" marginTop="-2em" />
    </Flex>
  );
}
