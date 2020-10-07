import { Flex, Text } from "@chakra-ui/layout";
import { ReactNode, ReactNodeArray } from "react";

export default function ProfileFormSection(props: {
  title: string;
  children: ReactNode | ReactNodeArray;
  first?: boolean;
}) {
  return (
    <>
      <Text
        fontFamily="titles"
        fontSize="1.5em"
        fontWeight="bold"
        paddingBottom="1em"
        marginTop={props.first ? "0" : "1em"}
        marginBottom="1em"
        borderBottom="2px"
        borderColor="back_lines_in_white"
      >
        {props.title}
      </Text>
      <Flex flexDirection="row" flexWrap="wrap">
        {props.children}
      </Flex>
    </>
  );
}
