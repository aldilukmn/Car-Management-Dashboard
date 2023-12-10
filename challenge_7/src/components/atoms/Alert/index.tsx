type MsgProps = {
  msg: string;
  className: string;
}

function Alert({msg, className}: MsgProps) {
  return (
    <>
      <div
        className={className}>
         {msg}
      </div>
    </>
  )
}

export default Alert