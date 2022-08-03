import React, { FC } from 'react'
import footer from '../assets/footer.png';
import master from '../assets/yoda.svg';

const Footer: FC = () => {
  return (
    <>
      <div className="section__footer flex bg-gray-800">
        <img src={footer} alt='footer' className='md:h-80 sm:h-52' />
        <div className="flex flex-col my-auto md:ml-4 sm:ml-1">
          <div className="footer__info flex text-slate-50">
            <a href='https://github.com/PZhukovski' target="_blank" className='text-decoration link mr-2 sm:mr-1 mb-6 font-medium' rel="noopener noreferrer" > Coded by Polina Zhukovski</a>
            <img src={master} alt='master' className="h-6" />
          </div>
          <div className="text-slate-50 flex font-extralight">*Dedicated to my brother, with love</div>
        </div>
      </div>
    </>
  )
}

export default Footer