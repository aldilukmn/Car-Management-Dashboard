type LabelProps = {
  label?: string,
  htmlFor: string,
  className: string,
}
function Label({label, htmlFor, className}: LabelProps) {
  return (
    <>
      <label htmlFor={htmlFor} className={className}>{label}</label>
    </>
  )
}

export default Label