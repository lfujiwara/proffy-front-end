import { Box, Input, InputProps } from "@chakra-ui/core";
import { Ref } from "react";

export default function ProffyInput(
  props: InputProps & {
    hookRef?: Ref<any>;
    roundBottomBorder?: boolean;
    roundTopBorder?: boolean;
    hideTopBorder?: boolean;
    hideBottomBorder?: boolean;
    component?: any;
    componentProps?: any;
  }
) {
  const {
    hookRef,
    roundBottomBorder,
    roundTopBorder,
    hideTopBorder,
    hideBottomBorder,
    componentProps,
    component,
    ...boxProps
  } = props;
  return (
    <Box
      as={component ?? Input}
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
      backgroundColor="shapes_02"
      _focus={{ borderColor: "initial" }}
      {...boxProps}
      {...(componentProps ?? {})}
    />
  );
}

ProffyInput.defaultProps = {
  roundBottomBorder: true,
  roundTopBorder: true,
};
