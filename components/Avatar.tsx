import { Box, Flex, FlexProps, Text, Image } from "@chakra-ui/core";

export default function Avatar(
  props: FlexProps & { avatarUrl?: string; name?: string }
) {
  return (
    <Flex {...props} alignItems="center">
      <Box backgroundColor="back_background">
        <Image height="40px" borderRadius="50%" src={props.avatarUrl} />
      </Box>
      <Box width="0.5em" />
      <Text fontSize="md">{props.name}</Text>
    </Flex>
  );
}

Avatar.defaultProps = {
  avatarUrl: "images/icons/avatar.png",
  name: "Alguém",
};
