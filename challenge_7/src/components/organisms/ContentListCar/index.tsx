import { useState } from 'react';
import { ListCar, Navigation, SizeButton, TitlePage } from '../..'

function ContentListCar() {
  const [sizeFilter, setSizeFilter] = useState<string>('');

  return (
    <>
      <div className="m-5 w-full">
        <Navigation/>
        <TitlePage/>
        <SizeButton setSizeFilter={setSizeFilter} />
        <ListCar sizeFilter={sizeFilter}/>
      </div>
    </>
  )
}

export default ContentListCar