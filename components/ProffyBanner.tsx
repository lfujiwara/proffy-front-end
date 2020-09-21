import { Box, BoxProps, Text } from "@chakra-ui/core";

export default function ProffyBanner(props: BoxProps) {
  return (
    <Box {...props} position="relative" backgroundColor="purple" paddingX="2em">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        maxWidth="20em"
      >
        <img src="/images/logo.svg" />
        <Text color="texts_in_purple_base" fontSize="1.3em">
          Sua plataforma de estudos online
        </Text>
      </Box>
      <img
        src="/images/success-background.svg"
        style={{
          transform: "rotate(90deg)",
        }}
      />
    </Box>
  );
}
