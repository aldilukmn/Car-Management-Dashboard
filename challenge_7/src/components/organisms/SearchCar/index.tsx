import { Button, DateSearchCar, Passengers, PickUpTime, SelectDriver } from '../..'

function SearchCar() {
  // const [driver, setDriver] = useState<string>('');
  // const [date, setDate] = useState<string>('');
  // const [pickUpTime, setPickUpTime] = useState<string>('');
  // const [passengers, setPassengers] = useState<string>('');

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = event.target;

  //   switch(name) {
  //     case "name":
  //       setName(value);
  //     break;
  //     case "rent":
  //       setRent(value);
  //     break;
  //     case "size":
  //       setSize(value);
  //     break;
  //   }
  // }


  return (
    <>
      <div className="flex border py-5 px-10 shadow-md absolute bg-white rounded -bottom-14 items-end text-sm right-44 left-44 justify-between">
      <SelectDriver/>
      <DateSearchCar/>
      <PickUpTime/>
      <Passengers/>
      <Button name='Search' className='bg-green-500 py-2 px-5 font-semibold text-white rounded'/>
      </div>
    </>
  )
}

export default SearchCar