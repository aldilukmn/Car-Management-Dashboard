import React from 'react'

type OptionProps = {
  value: string;
  size?: string;
  driver?: string
}

function Option({value, size, driver}: OptionProps) {
  return (
    <>
      <option value={value}>{size || driver}</option>
    </>
  )
}

export default Option