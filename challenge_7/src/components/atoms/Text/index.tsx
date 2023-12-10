type TextProps = {
  text: string | undefined;
  classname?: string;
  span?: string | React.ReactNode;
  classSpan?: string;
  onClick?: () => void
}

function Text({text, classname, span, classSpan, onClick}: TextProps) {
  return (
    <>
      <p className={classname} onClick={onClick}>{text}<span className={classSpan}>{span}</span></p>
    </>
  )
}

export default Text