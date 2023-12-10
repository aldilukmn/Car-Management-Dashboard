import React from 'react'

type IconProps = {
  icon: React.ReactNode;
  classname?: string;
} 

function Icon({icon, classname}: IconProps) {
  return (
    <>
      <div className={classname}>
        {icon}
      </div>
    </>
  )
}

export default Icon