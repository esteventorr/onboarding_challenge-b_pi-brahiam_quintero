import { FC } from "react";
import fromReactToWebComponentProps from "../../../utils/ds-utils";

export const Link: FC<PichinchaLinkHTMLAttributes> = ({ ...rest }) => {
  const propsToPass = fromReactToWebComponentProps(rest);

  return <pichincha-link {...propsToPass}></pichincha-link>;
};
