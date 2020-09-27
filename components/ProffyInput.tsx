import { Box, Input, InputProps } from "@chakra-ui/core";
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
  const {
    hookRef,
    roundBottomBorder,
    roundTopBorder,
    hideTopBorder,
    hideBottomBorder,
    ...boxProps
  } = props;
  return (
    <Box
      as={Input}
      ref={hookRef}
      borderTopLeftRadius={roundTopBorder ? "8px" : "0"}
      borderTopRightRadius={roundTopBorder ? "8px" : "0"}
      borderBottomLeftRadius={roundBottomBorder ? "8px" : "0"}
      borderBottomRightRadius={roundBottomBorder ? "8px" : "0"}
      borderTop={hideTopBorder ? "none" : ""}
      borderBottom={hideBottomBorder ? "none" : ""}
      borderColor="back_lines_in_white"
      color="texts_base"
      padding="1.5em"
      width="100%"
      background="transparent"
      _focus={{ borderColor: "initial" }}
      {...boxProps}
    />
  );
}

ProffyInput.defaultProps = {
  roundBottomBorder: true,
  roundTopBorder: true,
};
