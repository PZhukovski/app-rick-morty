import React, { useState, useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { IChar } from '../types/char';
import { useTypeSelector } from "../hooks/useTypedSelector";
import './header.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchHeroes, getDeleteHero, getViewHeroes, viewHeroesChanged } from '../slices/heroesSlice';
import HeroComponent from './HeroComponent';
import { getSelectedHero } from '../helpers/getSelectedHero';


const HeroesComponent: FC = () => {
    const [select, setSelect] = useState<number[]>([]);
    const [active, setActive] = useState(false);
    const [likedHeroes, setLikedHeroes] = useState<IChar[]>([])
    const dispatch = useDispatch<AppDispatch>();
    const heroes = useTypeSelector(getViewHeroes);
    
    useEffect(() => {
        dispatch(fetchHeroes())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onHandleLike = (id: number) => {
        if (select.indexOf(id) === -1) {
            setSelect(prevState => {
                return [...prevState, id]
            });
        }
        else {
            setSelect(select.filter(item => item !== id))
        }
    }

    const showLikedHero = (event: React.MouseEvent<HTMLElement>) => {
        setActive(!active);
        if (active === false) {
            const arr = getSelectedHero(heroes, select);
            setLikedHeroes(arr);
        }
        else {
            return heroes;
        }
    }

    const showMoreHeroes = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(viewHeroesChanged());
    }
    const onDelete = (id: number) => {
        console.log(id);
        dispatch(getDeleteHero(id));
    }

    return (
        <div className='heroes__section flex basis-2/3 flex-col border-4 rounded-lg border-cyan-300 my-6 mx-1'>
            {active === true ?
                <button onClick={showLikedHero} className="heroes__section-filter btn-show  py-3  mt-4 mx-auto w-36 bg-lime-500 border-1 rounded-lg shadow-lg hover:bg-lime-700" > Show All Heroes!</button>
                : <button onClick={showLikedHero} className="heroes__section-filter btn-show py-1  mt-4 mx-auto w-36 bg-lime-500 border-1 rounded-lg shadow-lg "> Show My fav Heroes!</button>
            }
            {active === true ?
                <TransitionGroup className="flex flex-wrap justify-between mt-6">
                    {likedHeroes.map((hero) => {
                        return <CSSTransition key={hero.id} timeout={1500} classNames="item">
                            <div className="hero__block flex justify-center bg-slate-50 rounded-lg shadow-md item">
                                <HeroComponent
                                    char={hero}
                                    select={select}
                                    onHandleLike={onHandleLike}
                                    onDelete={onDelete}
                                />
                            </div>
                        </CSSTransition>
                    })}  </TransitionGroup> :
                <TransitionGroup className="flex flex-wrap justify-between mt-6">
                    {heroes.map((hero) => {
                        return <CSSTransition key={hero.id} timeout={500}
                            classNames="item">
                            <div className="hero__block flex justify-center bg-slate-50 rounded-lg shadow-md item">
                                <HeroComponent char={hero}
                                    select={select}
                                    onHandleLike={onHandleLike}
                                    onDelete={onDelete}
                                />
                            </div>
                        </CSSTransition>
                    })}
                </TransitionGroup>
            }
            <button
                className='btn-show mb-6 w-36 bg-lime-500 border-1 py-3 mx-auto rounded-lg '
                onClick={showMoreHeroes}>
                Показать еще
            </button>
        </div>
    )
}

export default HeroesComponent