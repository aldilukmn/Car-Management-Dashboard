import { Option, Select, Title } from '../..'

function SelectDriver() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Title title='Driver Type'/>
        <Select id='driver-type' name='driver-type' value='' className='border p-2 rounded-md' onChange={() => console.log()}>
          <Option value='' size='Choose your driver type'/>
          <Option value='driver a' driver='Driver A'/>
          <Option value='driver b' driver='Driver B'/>
          <Option value='driver c' driver='Driver C'/>
        </Select>
      </div>
    </>
  )
}

export default SelectDriver