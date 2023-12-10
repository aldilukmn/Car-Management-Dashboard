type SignTitleProps = {
  title: string;
  className?: string;
}

function SignTitle({title, className}: SignTitleProps) {
  return (
    <>
      <h2 className={className}>{title}</h2>
    </>
  )
}

export default SignTitle