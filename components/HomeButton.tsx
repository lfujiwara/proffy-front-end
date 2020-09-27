import { Button, ButtonProps } from "@chakra-ui/core";

export default function HomeButton(props: ButtonProps) {
  return (
    <Button
      backgroundColor="purple"
      color="texts_in_purple_title"
      padding="3em"
      flex="1"
      {...props}
    >
      {props.children}
    </Button>
  );
}
