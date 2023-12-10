import React from 'react'
import { AddressLanding, CopyrigthFooter, NavFooter, SocMedFooter } from '../..'

function FooterLanding() {
  return (
    <>
      <div className='mx-44 flex gap-20 mb-24 justify-between'>
        <AddressLanding/>
        <NavFooter/>
        <SocMedFooter/>
        <CopyrigthFooter/>
      </div>
    </>
  )
}

export default FooterLanding