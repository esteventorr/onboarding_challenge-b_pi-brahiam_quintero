type VariantText =
  | "hero"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "title"
  | "subtitle"
  | "bodyText"
  | "captionText"
  | "legalText"
  | "amountPrimary"
  | "amountSecondary"
  | "actionLinkBody"
  | "actionLinkCaption"
  | "actionLinkLegal"
  | "actionDefault"
  | "actionSmall"
  | "smallText"
  | "tinyText"
  | "actionText"
  | "alertButtonText";
type Colors =
  | "blue"
  | "grey"
  | "yellow"
  | "black"
  | "white"
  | "darkGrey"
  | "danger"
  | "info"
  | "success"
  | "warning"
  | "strongBlue"
  | "grayishRed"
  | "moderateCyan"
  | "yellowGold"
  | "darkCyan"
  | "pureOrange"
  | "darkGrayishBlue"
  | "error";

interface PichinchaTypographyHTMLAttributes {
  align?: "inherit" | "left" | "center" | "right" | "justify";
  color?: Colors;
  inline_styles?: object;
  variant?: VariantText;
  weight?: "normal" | "bold";
  weight_color?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  children?: React.ReactNode;
  class?: string;
}

interface HTMLPichinchaTypographyElement
  extends PichinchaTypographyHTMLAttributes {
  addEventListener(event: string, callback: CallableFunction): void;
  removeEventListener(event: string, callback: CallableFunction): void;
}
interface PichinchaButtonHTMLAttributes {
  color?:
    | "primary"
    | "secondary"
    | "complementary"
    | "tertiary"
    | "destructive";
  disabled?: boolean;
  href?: string;
  type?: string;
  idelement?: string;
  loading?: boolean;
  size?: "medium" | "small" | "large" | "extra-large" = "large";
  tabIndexInner?: number;
  value?: string;
  iconName?: string;
  iconNameRight?: string;
  iconType?: "--outlined" | "--round" | "--sharp" | "--two-tone";
  onlyIcon?: boolean;
  ref?: MutableRefObject;
  categoryValues?: string[];
  onClick?: () => void;
  children?: React.ReactNode;
}

interface HTMLPichinchaButtonElement extends PichinchaButtonHTMLAttributes {
  addEventListener(event: string, callback: CallableFunction): void;
  removeEventListener(event: string, callback: CallableFunction): void;
}

interface PichinchaInputHTMLAttributes {
  inputmode?: string;
  pattern?: string;
  ref?: MutableRefObject;
  autoComplete?: boolean;
  autofocus?: boolean;
  class?: string;
  controlEvent?: boolean;
  errorHelper?: string;
  filterRegex?: string;
  floatingLabel?: boolean;
  fullWidth?: boolean;
  hideNumberHandles?: boolean;
  hidePasswordText?: string;
  idElement?: string;
  inputmode?: string;
  label?: string;
  maxLength?: number;
  nameElement?: string;
  normalHelper?: string;
  pattern?: string;
  placeholder?: string;
  showIconStatus?: boolean;
  showMaxLength?: boolean;
  showPasswordText?: string;
  showPasswordToggle?: boolean;
  showTooltipOnChange?: boolean;
  size?: "extra-small" | "small" | "medium" | "large";
  state?: "normal" | "disabled" | "success" | "error";
  tabIndexElement?: number;
  tooltip?: string;
  tooltipBody?: string;
  type?: string;
  value?: string;
  onChange?(value: string): void;
}

interface HTMLPichinchaInputElement extends PichinchaInputHTMLAttributes {
  addEventListener(event: string, callback: CallableFunction): void;
  removeEventListener(event: string, callback: CallableFunction): void;
}

interface PichinchaLinkHTMLAttributes {
  disabled?: boolean;
  children?: React.ReactNode;
  href?: string;
}

interface HTMLPichinchaLinkElement extends PichinchaLinkHTMLAttributes {
  addEventListener(event: string, callback: CallableFunction): void;
  removeEventListener(event: string, callback: CallableFunction): void;
}

interface PichinchaCheckboxHTMLAttributes {
  class?: string;
  value?: string;
  checked?: boolean;
  children?: React.ReactNode;
  idElement?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

interface HTMLPichinchaCheckboxElement extends PichinchaCheckboxHTMLAttributes {
  addEventListener(event: string, callback: CallableFunction): void;
  removeEventListener(event: string, callback: CallableFunction): void;
}

type DesignSystemElementAttributes =
  | PichinchaButtonHTMLAttributes
  | PichinchaInputHTMLAttributes
  | PichinchaTypographyHTMLAttributes
  | PichinchaLinkHTMLAttributes
  | PichinchaCheckboxHTMLAttributes;

declare namespace JSX {
  interface IntrinsicElements {
    "pichincha-button": PichinchaButtonHTMLAttributes;
    "pichincha-input": PichinchaInputHTMLAttributes;
    "pichincha-typography": PichinchaTypographyHTMLAttributes;
    "pichincha-link": PichinchaLinkHTMLAttributes;
    "pichincha-check-box": PichinchaCheckboxHTMLAttributes;
  }
}
