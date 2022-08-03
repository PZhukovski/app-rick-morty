import { IChar } from '../types/char'

const CharRandomComponent = (char: IChar) => {
  return (
    <>
      <img src={char.image} alt='ava' className='h-36 rounded-tl-lg rounded-bl-lg shadow-md' />
      <div className="random__info-description ml-6">
        <div className="randon__info-title font-semibold md:text-xl sm:text-base">
          {char.name}
        </div>
        <div className="random__info-live flex items-center font-semibold ml-4">
          <div className={char.status === "Alive" ? "random__info-status-color live" : "random__info-status-color dead "}>
          </div>
          <div className="randon__info-status  font-semibold mt-2 ml-2 ">
            {char.status}
          </div>
          <div className="randon__info-species mt-2">
            -{char.species}
          </div>
        </div>
        <div className="random__info-location font-semibold mt-3">
          Last known location:
          <br />{char.location}
        </div>
      </div>
    </>
  )
}

export default CharRandomComponent