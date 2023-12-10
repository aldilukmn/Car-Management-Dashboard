import { createContext } from 'react';

interface HiddenSideBarContextProps {
  isHiddenSideBar: boolean;
  toggleMenuClicked: () => void;
}

const HiddenSideBarContext = createContext<HiddenSideBarContextProps>({
  isHiddenSideBar: false,
  toggleMenuClicked: () => {},
});

export default HiddenSideBarContext;
