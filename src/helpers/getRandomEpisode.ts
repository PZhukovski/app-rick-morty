const getRandomEpisode =() => { // min and max included
    return Math.floor(Math.random() * (51 - 1 + 1) + 1)
  }
  
 export default getRandomEpisode;