import { Icon, Text, Title } from "../.."
import { BiLike } from "react-icons/bi";
import { RiPriceTag3Line } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { FiAward } from "react-icons/fi";

function WhyUs() {
  return (
    <>
      <div className="flex mx-44 py-24 flex-col gap-3">
        <Title title="Why Us?" classname=" font-bold text-xl"/>
        <Text text="Mengapa harus pilih Binar Car Rental?"/>
        <div className="grid grid-cols-4 gap-6">
          <div className="border p-4 rounded flex flex-col gap-1">
            <Icon icon={<BiLike/>} classname="bg-yellow-400 w-6 text-white rounded-full p-1"/>
            <Title title="Mobil Lengkap" classname="font-bold text-sm"/>
            <Text text="Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat" classname="text-sm"/>
          </div>
          <div className="border p-4 rounded flex flex-col gap-1">
            <Icon icon={<RiPriceTag3Line/>} classname="transform -scale-x-100 bg-pink-500 w-6 text-white rounded-full p-1"/>
            <Title title="Harga Murah" classname="font-bold text-sm"/>
            <Text text="Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain" classname="text-sm"/>
          </div>
          <div className="border p-4 rounded flex flex-col gap-1">
            <Icon icon={<IoMdTime/>} classname=" bg-blue-800 w-6 text-white rounded-full p-1"/>
            <Title title="Layanan 24 Jam" classname="font-bold text-sm"/>
            <Text text="Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu" classname="text-sm"/>
          </div>
          <div className="border p-4 rounded flex flex-col gap-1">
            <Icon icon={<FiAward/>} classname="bg-green-600 w-6 text-white rounded-full p-1"/>
            <Title title="Sopir Profesional" classname="font-bold text-sm"/>
            <Text text="Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu" classname="text-sm"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhyUs