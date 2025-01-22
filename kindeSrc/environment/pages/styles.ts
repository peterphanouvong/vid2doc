// CSS Variables configuration
const kindeVariables = {
  baseFontFamily:
    "-apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif",
  controlSelectTextBorderRadius: "12px",
  buttonPrimaryBackgroundColor: "#706EDE",
  buttonPrimaryColor: "#fff",
  buttonBorderRadius: "12px",
  buttonSecondaryBackgroundColor: "#fff",
  buttonSecondaryBorderWidth: "1px",
  buttonSecondaryBorderColor: "#ccc",
  buttonSecondaryBorderStyle: "solid",
  buttonSecondaryBorderRadius: "12px",
  buttonBlockSize: "44px",
  controlSelectTextBlockSize: "44px",
} as const;

export const generateCSSVariables = (): string => `
  :root {
    --kinde-base-font-family: ${kindeVariables.baseFontFamily};
    --kinde-control-select-text-border-radius: ${kindeVariables.controlSelectTextBorderRadius};
    --kinde-button-primary-background-color: ${kindeVariables.buttonPrimaryBackgroundColor};
    --kinde-button-primary-color: ${kindeVariables.buttonPrimaryColor};
    --kinde-button-border-radius: ${kindeVariables.buttonBorderRadius};
    --kinde-button-secondary-background-color: ${kindeVariables.buttonSecondaryBackgroundColor};
    --kinde-button-secondary-border-width: ${kindeVariables.buttonSecondaryBorderWidth};
    --kinde-button-secondary-border-color: ${kindeVariables.buttonSecondaryBorderColor};
    --kinde-button-secondary-border-style: ${kindeVariables.buttonSecondaryBorderStyle};
    --kinde-button-secondary-border-radius: ${kindeVariables.buttonSecondaryBorderRadius};
    --kinde-button-block-size: ${kindeVariables.buttonBlockSize};
    --kinde-control-select-text-block-size: ${kindeVariables.controlSelectTextBlockSize};
  }

`;
