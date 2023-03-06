import { FC, FormHTMLAttributes } from 'react';
import "./form.scss";

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export const Form: FC<FormProps> = ({ className, children, ...rest }) => {
  return (
    <form className={className} {...rest}>
      {children}
    </form>
  );
}; 