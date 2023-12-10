import { Text, Title } from '../..'

function TitleFAQ() {
  return (
    <>
      <div className="flex flex-col gap-5 w-11/12">
        <Title title='Frequently Asked Question' classname='text-2xl font-bold'/>
        <Text text='Lorem ipsum dolor sit amet, consectetur adipiscing elit'/>
      </div>
    </>
  )
}

export default TitleFAQ