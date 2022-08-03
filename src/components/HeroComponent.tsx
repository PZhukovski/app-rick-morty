import { IChar } from '../types/char'
import like from '../assets/like.svg';
import notlike from '../assets/notlike.svg';
import deleteHero from '../assets/delete.svg';
import './header.scss';
interface Props {
    char: IChar,
    select: number[],
    onDelete: (id: number) => void,
    onHandleLike: (id: number) => void
};

const HeroComponent = ({ char, select, onDelete, onHandleLike }: Props) => {
    return (
        <>
            <div className="flex flex-col">
                <img src={char.image} alt='ava' className='h-36 rounded-tl-lg rounded-tr-lg shadow-md' />
                <div className="random__info-description">
                    <div className="randon__info-title font-semibold mt-2">
                        {char.name}
                    </div>
                    <div className="random__info-live flex mb-2.5 items-center">
                        <div className={char.status === "Alive" ? "random__info-status-color live" : "random__info-status-color dead "}>
                        </div>
                        <div className="randon__info-status ml-2 font-semibold mt-1">
                            {char.status}-
                        </div>
                        <div className="randon__info-species font-semibold mt-1">
                            {char.species}
                        </div>
                    </div>
                    <div className="random__like flex items-center mb-2">
                        <div className="" onClick={() => onHandleLike(char.id)}>
                            {select.includes(char.id) ?
                                <img src={like} alt='ava' className='h-5 mr-2' /> :
                                <img src={notlike} alt='ava' className='h-5 mr-2' />}
                        </div>

                        <div className="random__like-comment">
                            I like this hero!
                        </div>
                    </div>
                    <div className="random__like flex items-center mb-2">
                        <div className="" onClick={() => onDelete(char.id)}>
                            <img src={deleteHero} alt='ava' className='h-5 mr-2' />
                        </div>
                        <div className="random__like-comment">
                            Delete this hero!
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroComponent