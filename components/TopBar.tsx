import { IconButton, Image, Text } from "@chakra-ui/core";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import Router from "next/router";

export default function TopBar(props: { title: string }) {
  return (
    <Flex alignSelf="stretch">
      <Flex
        flex="1"
        backgroundColor="little_purple"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingX="1em"
        paddingY="0.5em"
      >
        <IconButton
          onClick={() => Router.push("/")}
          colorScheme="texts_in_purple_base"
          size="sm"
          icon={<ArrowBackIcon />}
        />
        <Text color="texts_in_purple_base" fontSize="14px">
          {props.title}
        </Text>
        <Image height="14px" src="/images/logo.svg" />
      </Flex>
    </Flex>
  );
}
