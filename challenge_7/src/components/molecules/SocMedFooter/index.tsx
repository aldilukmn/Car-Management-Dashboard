import React from 'react'
import { Icon, Title } from '../..'
import { SlSocialFacebook } from "react-icons/sl";
import { CiInstagram } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FiTwitch } from "react-icons/fi";


function SocMedFooter() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <Title title='Connect with us'/>
        <div className="flex gap-3">
          <Icon icon={<SlSocialFacebook/>} classname='rounded-full p-1 text-white bg-blue-700 text-2xl'/>
          <Icon icon={<CiInstagram/>} classname='rounded-full p-1 text-white bg-blue-700 text-2xl'/>
          <Icon icon={<CiTwitter/>} classname='rounded-full p-1 text-white bg-blue-700 text-2xl'/>
          <Icon icon={<MdOutlineMail/>} classname='rounded-full p-1 text-white bg-blue-700 text-2xl'/>
          <Icon icon={<FiTwitch/>} classname='rounded-full p-1 text-white bg-blue-700 text-2xl'/>
        </div>
      </div>
    </>
  )
}

export default SocMedFooter