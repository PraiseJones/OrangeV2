import { extendTheme, ThemeConfig } from "@chakra-ui/react";

export const chakraThemeConfig: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const chakraTheme = extendTheme({
  config: chakraThemeConfig,
  fonts: {
    heading: `'Josefin Sans', sans-serif`,
    body: `'Schibsted Grotesk', sans-serif`,
    mono: `'Schibsted Grotesk', monospace`,
  },
  colors: {
    brand: {
      primary: "#ff5900",
      secondary: "#FFFFFC",
      dark: "#090809",
    },
    gray: {
      50: "#FFFFFC",
      100: "#f7f7f7",
      200: "#e6e6e6",
      300: "#d1d1d1",
      400: "#a0a0a0",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#090809",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "#090809" : "#FFFFFC",
        color: props.colorMode === "dark" ? "#FFFFFC" : "#090809",
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
      variants: {
        solid: {
          bg: "#ff5900",
          color: "#FFFFFC",
          _hover: {
            bg: "#e64d00",
          },
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === "dark" ? "#262626" : "#f8f8f8",
          borderColor: props.colorMode === "dark" ? "#404040" : "#e2e8f0",
        },
      }),
    },
  },
  semanticTokens: {
    colors: {
      'chakra-body-text': { _light: '#090809', _dark: '#FFFFFC' },
      'chakra-body-bg': { _light: '#FFFFFC', _dark: '#090809' },
      'chakra-subtle-bg': { _light: '#f8f8f8', _dark: '#262626' },
      'chakra-subtle-text': { _light: '#4a5568', _dark: '#a0aec0' },
    },
  },
});
