import {IEpisode} from '../types/episode';

const transformDataEpisode =(data: IEpisode)=>{

    return {
        id: data.id,
        name: data.name,
        episode: data.episode,
        date: data.air_date,
    }
    }
    export default transformDataEpisode;