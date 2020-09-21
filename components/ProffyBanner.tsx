import { Box, BoxProps, Text } from "@chakra-ui/core";
import ProffyLogo from "./ProffyLogo";

export default function ProffyBanner(props: BoxProps) {
  return (
    <Box {...props} position="relative" backgroundColor="purple" paddingX="2em">
      <ProffyLogo
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        maxWidth="20em"
      />
      <img
        src="/images/success-background.svg"
        style={{
          transform: "rotate(90deg)",
        }}
      />
    </Box>
  );
}
