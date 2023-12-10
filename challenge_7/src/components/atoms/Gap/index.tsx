type GapProps = {
  width?: number,
  height?: number,
}

function Gap({width, height}: GapProps) {
  return (
    <>
      <div style={{width, height}}></div>
    </>
  )
}

export default Gap