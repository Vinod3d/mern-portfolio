import './Navbar.css'
import logo from '../../assets/logo.svg'
import logoDark from '../../assets/logo-dark.svg'
import underline from '../../assets/nav_underline.svg'
import {useRef, useState} from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import menu_open from '../../assets/menu_open.svg'
import menu_openDark from '../../assets/menu_openDark.svg'
import menu_close from '../../assets/menu_close.svg'
import { ModeToggle } from '../../components/mode-toggle'
import { useTheme } from '../../components/themeProvider'

const Navbar = () => {
   const { theme } = useTheme();
   const [menu, setMenu] = useState("home");
   const menuRef = useRef();

   const openMenu = () =>{
      menuRef.current.style.right="0";
   }

   const closeMenu = () =>{
      menuRef.current.style.right="-350px";
   }
  return (
    <div className='navbar'>
        <div id="home">
            <img src={theme === 'dark' ? logo : logoDark} alt="logo" className="logo" width="100px" height="50px"/>
            <img src={theme === 'dark' ? menu_open : menu_openDark} alt="" className='nav-mob-open' onClick={openMenu} width="40px" height="40px"/>
        </div>
        <ul className='nav-menu' ref={menuRef}>
            <img src={menu_close} alt="" className='nav-mob-close' onClick={closeMenu}/>
            <li onClick={()=>setMenu('home')}>
               <AnchorLink className={theme === 'dark' ? 'anchor-link' : 'text-gray-900'} offset={50} href="#home">
                  Home
                  {menu === "home" ? <img src={underline} alt="" width="35px" height="8px"/> : <></>}
               </AnchorLink>
            </li>
            <li onClick={()=>setMenu('about')}> 
               <AnchorLink href="#about" className={theme === 'dark' ? 'anchor-link' : 'text-gray-900'} offset={50}>
                  About
                  {menu === "about" ? <img src={underline} alt="" width="35px" height="8px"/> : <></>}
               </AnchorLink>
            </li>
            <li onClick={()=>setMenu('services')}>
               <AnchorLink href="#services" className={theme === 'dark' ? 'anchor-link' : 'text-gray-900'} offset={50}>
                  Services
                  {menu === "services" ? <img src={underline} alt="" width="35px" height="8px"/> : <></>}
               </AnchorLink>
            </li>
            <li onClick={()=>setMenu('portfolio')}>
               <AnchorLink href="#portfolio" className={theme === 'dark' ? 'anchor-link' : 'text-gray-900'} offset={50}>
                  Portfolio
                  {menu === "portfolio" ? <img src={underline} alt="" width="35px" height="8px"/> : <></>}
               </AnchorLink>
            </li>
            <li onClick={()=>setMenu('contact')}>
               <AnchorLink href="#contact" className={theme === 'dark' ? 'anchor-link' : 'text-gray-900'} offset={50}>
                  Contact
                  {menu === "contact" ? <img src={underline} alt="" width="35px" height="8px"/> : <></>}
               </AnchorLink>
            </li>
            <li>
               <ModeToggle/>
            </li>
        </ul>
        <div className="nav-connect">
         <AnchorLink href="#contact" className="anchor-link" offset={50}>Connect With Me</AnchorLink>
        </div>
    </div>
  )
}

export default Navbar