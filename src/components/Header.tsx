import React, { FC } from 'react'
import logo from '../assets/header.png';
import cucumber from '../assets/cucumber.png';
import header_right from '../assets/header-right.png';
import './header.scss';

const Header: FC = () => {
    return (
        <>
            <div className="header__section bg-gray-800">
                <div className="header__block header mx-4">
                    <div className="header__top ">
                        <img src={cucumber} alt='logo' className='h-20 top__img-left' />
                        <img src={header_right} alt='logo' className='h-20 top__img-right' />
                    </div>
                    <div className="header__title justify-center items-center flex">
                        <h2 className='text-white font-bold'>Hi! Its</h2>
                        <img src={logo} alt='logo' className='h-20' />
                        <h2 className='text-white font-bold'> App!</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
