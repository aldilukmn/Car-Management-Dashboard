import { Option, Select, Title } from '../..'

function PickUpTime() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Title title='Pick Up Time'/>
        <Select id='pick-up-time' name='pick-up-time' value='' className='border p-2 rounded-md' onChange={() => console.log()}>
          <Option value='' size='Choose your pick up time'/>
          <Option value='8' driver='08.00'/>
          <Option value='9' driver='09.00'/>
          <Option value='10' driver='10.00'/>
          <Option value='11' driver='11.00'/>
          <Option value='12' driver='12.00'/>
        </Select>
      </div>
    </>
  )
}

export default PickUpTime