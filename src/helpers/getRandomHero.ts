const getRandomHero =() => { // min and max included
    return Math.floor(Math.random() * (826 - 1 + 1) + 1)
  }
  
 export default getRandomHero;