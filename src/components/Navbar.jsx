import * as React from "react";
import Logo from '../assets/logo.png'


export default function NavigationBar() {
  return (
    <>
      <nav style={{ zIndex: '100' }} className="bg-transparent h-16 flex justify-left items-center pl-4  top-2 overflow-hidden">
        <img src={Logo} className="h-14" />
      </nav>
    </>
  )
}