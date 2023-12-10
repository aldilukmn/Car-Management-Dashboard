import React, { useState } from 'react';
import HiddenSideBarContext from '../HiddenSideBarContext';

interface HiddenSideBarProps {
  children: React.ReactNode;
}

function HiddenSideBar({ children }: HiddenSideBarProps) {
  const [isHiddenSideBar, setIsHiddenSideBar] = useState<boolean>(false);

  const toggleMenuClicked = () => {
    setIsHiddenSideBar((prev) => !prev);
  };

  return (
    <>
      <HiddenSideBarContext.Provider value={{ isHiddenSideBar, toggleMenuClicked }}>
        {children}
      </HiddenSideBarContext.Provider>
    </>
  );
}

export default HiddenSideBar;
