type ButtonProps = {
  name?: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick ?: () => void;
  form?: string;
  children?: React.ReactNode;
}


function Button({name, className, disabled, onClick, form, children}: ButtonProps) {
  return (
    <>
      <button className={className} onClick={onClick} disabled={disabled} form={form}>
        {children} {name}
      </button>
    </>
  )
}

export default Button