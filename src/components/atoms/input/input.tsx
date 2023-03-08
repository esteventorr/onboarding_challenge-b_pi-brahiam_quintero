import { FC, useCallback, useEffect, useRef } from "react";
import fromReactToWebComponentProps from "../../../utils/ds-utils";

export const Input: FC<PichinchaInputHTMLAttributes> = ({
  onChange,
  ...rest
}) => {
  const propsToPass = fromReactToWebComponentProps(rest);
  const inputRef = useRef<HTMLPichinchaInputElement>();

  const handleOnChange = useCallback(
    (event: CustomEvent) => {
      onChange?.(event.detail);
    },
    [onChange]
  );

  useEffect(() => {
    const currentRef = inputRef.current;

    currentRef?.addEventListener("eventValue", handleOnChange);
    return () => {
      currentRef?.removeEventListener("eventValue", handleOnChange);
    };
  }, [inputRef, handleOnChange]);

  return <pichincha-input ref={inputRef} {...propsToPass}></pichincha-input>;
};
