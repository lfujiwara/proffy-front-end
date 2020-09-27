import { theme } from "@chakra-ui/core";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    another_purple: "#9871F5",
    purple: "#8257E5",
    little_purple: "#774DD6",
    purple_dark: "#6842C2",
    green: "#04D361",
    custom_green: {
      50: "#dcffed",
      100: "#aeffd3",
      200: "#7efeb8",
      300: "#4dfc9c",
      400: "#1efb81",
      500: "#04e168",
      600: "#00af50",
      700: "#007d39",
      800: "#004c20",
      900: "#001b07",
    },
    another_green: "#24EF7F",
    delete: "#E33D3D",
    back_lines_in_white: "#E6E6F0",
    back_hover: "#EBEBF5",
    back_background: "#F0F0F7",
    shapes_01: "#FFFFFF",
    shapes_02: "#FAFAFC",
    shapes_disabled: "#DCDCE5",
    texts_titles: "#32264D",
    texts_base: "#6A6180",
    texts_complements: "#9C98A6",
    texts_inputs: "#8257E5",
    texts_in_purple_title: "#FFFFFF",
    texts_in_purple_base: "#D4C2FF",
    texts_in_purple_complement: "#A380F6",
  },
  fonts: {
    body: "Poppins, sans-serif",
    titles: "Archivo, sans-serif",
  },
  space: {
    button_padding_x: "2em",
    button_padding_y: "1em",
  },
};

export default customTheme;
