import './SettingsView.css'
import { TbArrowBarDown } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { BsBookmarkStar } from "react-icons/bs";
import { IoQrCode } from "react-icons/io5";
import { TfiTimer } from "react-icons/tfi";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";

const SettingsView = ({ showSettings, setShowSettings }) => {
    return (

        <article className='burgerWrapper'>
            <div className='greyScreenActive'></div>
            <nav className={showSettings ? 'burgerNav showBurgerNav' : "burgerNav"}>
                <ul>
                    <li><label htmlFor="burger" className='burgerDown' onClick={() => setShowSettings(prev => !prev)}><TbArrowBarDown className='barDownBurger' /></label></li>
                    <li><a href="/UnderConstruction"><FiSettings className='advSetIcon' />Settings</a></li>
                    <li><a href="/UnderConstruction"><HiOutlineArchiveBoxArrowDown className='advSetIcon' />Archive</a></li>
                    <li><a href="/UnderConstruction"><TfiTimer className='advSetIcon' />Your Activity</a></li>
                    <li><a href="/UnderConstruction"><IoQrCode className='advSetIcon' />QR Code</a></li>
                    <li><a href="/UnderConstruction"><BsBookmarkStar className='advSetIcon' />Close Friends</a></li>
                    <li><a href="/UnderConstruction"><FaRegHeart className='advSetIcon' />Favourites</a></li>
                </ul>
            </nav>
        </article>

    );
}

export default SettingsView;