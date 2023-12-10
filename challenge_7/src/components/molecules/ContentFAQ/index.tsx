import { Accordion } from '../..'

function ContentFAQ() {

  return (
    <>
      <div className='flex-initial w-11/12 flex flex-col gap-3'>
        <Accordion title='Apa saja syarat yang dibutuhkan?'/>
        <Accordion title='Berapa hari minimal sewa mobil lepas kunci?'/>
        <Accordion title='Berapa hari sebelumnya sabaiknya booking sewa mobil?'/>
        <Accordion title='Apakah Ada biaya antar-jemput?'/>
        <Accordion title='Bagaimana jika terjadi kecelakaan?'/>
      </div>
    </>
  )
}

export default ContentFAQ