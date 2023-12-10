import { Input, Title } from '../..'

function DateSearchCar() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Title title='Date'/>
        <Input type='date' className='p-2 border rounded-md'/>
      </div>
    </>
  )
}

export default DateSearchCar