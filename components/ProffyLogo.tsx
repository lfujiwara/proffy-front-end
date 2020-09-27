import { Box, BoxProps, Text } from "@chakra-ui/core";

export default function ProffyLogo(props: BoxProps) {
  return (
    <Box {...props}>
      <img src="/images/logo.svg" width="100%" />
      <Text
        color="texts_in_purple_base"
        fontSize={["100%", "120%", "130%", "150%"]}
      >
        Sua plataforma de <br /> estudos online
      </Text>
    </Box>
  );
}
