import { Box, Flex, FlexProps, Image, Text } from "@chakra-ui/core";
import Link from "next/link";

export default function Avatar(
  props: FlexProps & { avatarurl?: string; name?: string }
) {
  return (
    <Link href="/profile">
      <Flex {...props} alignItems="center">
        <Box backgroundColor="back_background">
          <Image height="40px" borderRadius="50%" src={props.avatarurl} />
        </Box>
        <Box width="0.5em" />
        <Text fontSize="md">{props.name}</Text>
      </Flex>
    </Link>
  );
}

Avatar.defaultProps = {
  avatarurl: "images/icons/avatar.png",
  name: "Alguém",
};
