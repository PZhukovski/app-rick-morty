import React, { FC } from 'react'
import RandomChar from './RandomChar';
import HeroesComponent from './HeroesComponent';
import EpisodeComponent from './EpisodeComponent';
import Footer from './Footer';

const MainPage : FC= () => {
  return (
    <>
      <RandomChar />
      <div className="flex md:flex-row sm:flex-col">
        <HeroesComponent />
        <EpisodeComponent />
      </div>
      <Footer />
    </>

  )
}

export default MainPage;