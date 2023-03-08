import { FC } from "react";
import fromReactToWebComponentProps from "../../../utils/ds-utils";

export const Checkbox: FC<PichinchaCheckboxHTMLAttributes> = ({ ...rest }) => {
  const propsToPass = fromReactToWebComponentProps(rest);

  return <pichincha-check-box {...propsToPass}></pichincha-check-box>;
};
