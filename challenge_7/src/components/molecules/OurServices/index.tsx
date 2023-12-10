import { Img, Text, Title } from "../.."
import { ourServiceImg } from "../../../assets"
import { FaCheckCircle } from "react-icons/fa";

function OurServices() {
  return (
    <>
      <div className="flex mx-44 gap-24 items-center pt-24">
        <Img src={ourServiceImg} alt="our-service-image" classname="w-96"/>
        <div className="flex flex-col gap-5">
          <Title title="Best Car Rental for any kind of trip in (Lokasimu)!" classname=" font-bold text-2xl"/>
          <Text text="Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga lebih murah dibandingkan yang lain, kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting, dll."/>
          <div className="flex flex-col gap-4">
            <Text text="Sewa Mobil Dengan Supir di Bali 12 Jam" classname="flex gap-3 text-lg flex-row-reverse self-start items-center" span={<FaCheckCircle className="text-indigo-400 text-2xl"/>}/>
            <Text text="Sewa Mobil Lepas Kunci di Bali 24 Jam" classname="flex gap-3 text-lg flex-row-reverse self-start items-center" span={<FaCheckCircle className="text-indigo-400 text-2xl"/>}/>
            <Text text="Sewa Mobil Jangka Panjang Bulanan" classname="flex gap-3 text-lg flex-row-reverse self-start items-center" span={<FaCheckCircle className="text-indigo-400 text-2xl"/>}/>
            <Text text="Gratis Antar - Jemput Mobil di Bandara" classname="flex gap-3 text-lg flex-row-reverse self-start items-center" span={<FaCheckCircle className="text-indigo-400 text-2xl"/>}/>
            <Text text="Layanan Airport Transfer / Drop In Out" classname="flex gap-3 text-lg flex-row-reverse self-start items-center" span={<FaCheckCircle className="text-indigo-400 text-2xl"/>}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurServices