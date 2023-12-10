import React, { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  type?: string | FileList;
  placeholder?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: stringz
};

const SignInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <>
        <input
          {...props}
          ref={ref} className={className}
        />
      </>
    );
  }
);

export default SignInput;
