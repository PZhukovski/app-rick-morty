import picture from '../assets/episode.png';
import React, { useState, useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEpisode, getEpisode } from '../slices/episodeSlice';
import { AppDispatch } from '../store';
import { useTypeSelector } from "../hooks/useTypedSelector";
import './header.scss';
import getRandomEpisode from '../helpers/getRandomEpisode';
import { commentForEpisode } from '../helpers/commentForEpisode';

const EpisodeComponent : FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [count, setCount] = useState(0);

    useEffect(() => {
        const number = getRandomEpisode();
        dispatch(fetchEpisode(number));
   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const episodes = useTypeSelector(getEpisode);
    const episode = episodes[episodes.length - 1]

    const handlePlus = (event: React.MouseEvent<HTMLElement>) => {
        const number = getRandomEpisode();
        dispatch(fetchEpisode(number));
        setCount(count + 1);
    }
    const handleMinus = (event: React.MouseEvent<HTMLElement>) => {
        const number = getRandomEpisode();
        dispatch(fetchEpisode(number));
        setCount(count - 1);
    }

    return (
        <div className='episode__section basis-1/3 flex flex-col  border-4 rounded-lg border-amber-200 mt-6 mb-6 md:mr-1 sm:mx-1'>
            <div className='mt-6 text-xl font-bold '>Do You know this Episode?</div>
            {episodes.length > 0 ?
                <>
                    <div className="episode__info-description bg-slate-200 rounded-md shadow-md mt-4 ml-6 mr-6">
                        <div className="episode__info-title font-semibold mt-3">
                            Name: {episode.name}
                        </div>
                        <div className="episode__info-episode  mt-3 font-semibold">
                            Season: {episode.episode}
                        </div>
                        <div className="episode__info-time  mt-3 mb-3 font-semibold">
                            Time: {episode.date}
                        </div>
                    </div>
                    <div className="episode__info-comment bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/40 pt-2 mt-4 ml-2  mb-6 font-semibold">
                        {commentForEpisode(count)}
                    </div>
                </>
                : ''}
            <div className="flex justify-around mb-6">
                <button onClick={handleMinus} className='h-7 w-24 bg-sky-200 hover:bg-sky-500 rounded-lg shadow-md'>No!</button>
                <button onClick={handlePlus} className='h-7 w-24 bg-sky-200 hover:bg-sky-500   rounded-lg shadow-md'>Yes! </button>
            </div>
            <div className="episode__picture flex mx-auto">
                <img src={picture} alt='episode' className='h-80' />
            </div>

        </div>
    )
}

export default EpisodeComponent