import { Input, InputProps, Box } from "@chakra-ui/core";
import { Ref } from "react";

export default function ProffyInput(
  props: InputProps & {
    hookRef?: Ref<any>;
    roundBottomBorder?: boolean;
    roundTopBorder?: boolean;
    hideTopBorder?: boolean;
    hideBottomBorder?: boolean;
  }
) {
  return (
    <Box
      as={Input}
      ref={props.hookRef}
      borderTopLeftRadius={props.roundTopBorder ? "8px" : "0"}
      borderTopRightRadius={props.roundTopBorder ? "8px" : "0"}
      borderBottomLeftRadius={props.roundBottomBorder ? "8px" : "0"}
      borderBottomRightRadius={props.roundBottomBorder ? "8px" : "0"}
      borderTop={props.hideTopBorder ? "none" : ""}
      borderBottom={props.hideBottomBorder ? "none" : ""}
      borderColor="back_lines_in_white"
      color="texts_base"
      padding="1.5em"
      width="100%"
      background="transparent"
      _focus={{ borderColor: "initial" }}
      {...props}
    />
  );
}

ProffyInput.defaultProps = {
  roundBottomBorder: true,
  roundTopBorder: true,
};
