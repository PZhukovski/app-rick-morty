import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import random from '../assets/random.png';
import { fetchChar, getChar } from '../slices/charSlice';
import randomNumber from '../helpers/getRandomHero';
import { AppDispatch } from '../store';
import { useTypeSelector } from "../hooks/useTypedSelector";
import './header.scss';
import CharComponent from './CharRandomComponent';
import { CSSTransition } from 'react-transition-group';

const RandomChar: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    const number = randomNumber();
    dispatch(fetchChar(number));
    setLoaded(true);
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  const hero = useTypeSelector(getChar);
  const char = hero[hero.length - 1];


  const handleRandom = (event: React.MouseEvent<HTMLElement>) => {
    const number = randomNumber();
    dispatch(fetchChar(number));
    setLoaded(false);
  }

  return (
    <div className='random__block rounded-lg flex border-4 border-lime-300 mt-4 mx-1'>
      <div className="random__description flex basis-1/2 justify-around m-2">
        <div className="randon__info flex h-30 w-96 item bg-slate-50 rounded-lg shadow-md">

          <CSSTransition in={loaded} timeout={2500} classNames="random__char">
          <CharComponent {...char} />
        </CSSTransition>
      </div>
    </div><div className="randon__click basis-1/2 sm:mb-2">
        <div className="random__click-info flex">
          <div className="random__click-text">
            <div className="random__title text-center  mt-3 mb-3 md:text-md sm:text-sm font-bold ">
              Random person for today!
              <br /> Do you want to get to know him better?
              <br />
              <br />
              Or choose another one
            </div>
            <button onClick={handleRandom} className='h-30 w-40 bg-sky-300 rounded-lg shadow-md font-semibold'>Get random!</button>
          </div>
          <img src={random} className='md:h-36 sm:h-32 mt-2' alt='random' />
        </div>
      </div>
    </div >
  )
}

export default RandomChar