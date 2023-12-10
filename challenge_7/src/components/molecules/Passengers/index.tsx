import { Option, Select, Title } from '../..'

function Passengers() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Title title='Passengers (Optional)'/>
        <Select id='passengers' name='passengers' value='' className='border p-2 rounded-md' onChange={() => console.log()}>
          <Option value='' size='Choose your passengers'/>
          <Option value='2' driver='2'/>
          <Option value='4' driver='4'/>
          <Option value='6' driver='6'/>
        </Select>
      </div>
    </>
  )
}

export default Passengers