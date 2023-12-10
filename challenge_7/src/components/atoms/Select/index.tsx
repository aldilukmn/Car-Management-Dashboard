import React from 'react'

type SelectProps = {
  id: string,
  name: string,
  value: string,
  className: string,
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ id, name, value, className, children, onChange}: SelectProps) {
  return (
    <>
      <select id={id} className={className} name={name} value={value} onChange={onChange}>
        {children}
      </select>
    </>
  )
}

export default Select