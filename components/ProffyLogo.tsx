import { Box, BoxProps, Text } from "@chakra-ui/core";

export default function ProffyLogo(props: BoxProps) {
  return (
    <Box {...props}>
      <img src="/images/logo.svg" />
      <Text
        color="texts_in_purple_base"
        fontSize={["5vw", "4vw", "2vw", "1.5em"]}
      >
        Sua plataforma de <br /> estudos online
      </Text>
    </Box>
  );
}
