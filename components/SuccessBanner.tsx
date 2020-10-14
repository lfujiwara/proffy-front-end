import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { MotionBox } from "./animated";

export default function SuccessBanner(props: {
  title: React.ReactNode | React.ReactNodeArray;
  text: React.ReactNode | React.ReactNodeArray;
}) {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      display="flex"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="purple"
      backgroundImage="url('/images/success-background.svg')"
      backgroundPosition="center"
      backgroundRepeat="space"
      flexDirection="column"
    >
      <Image
        src="/images/icons/success-check-icon.svg"
        alt="Ícone - cadastro concluído"
        marginBottom="1em"
      />
      <Text
        fontFamily="titles"
        color="texts_in_purple_title"
        fontWeight="bold"
        fontSize="2em"
        marginBottom="1em"
      >
        {props.title}
      </Text>
      <Text color="texts_in_purple_base" maxWidth="xl">
        {props.text}
      </Text>
    </MotionBox>
  );
}
