import Entry from '@/components/Entry';
import { IGame } from '@/schemas/GameSchema';
import Footer from '@/sections/Footer';
import Highlight from '@/sections/Highlight';
import Navbar from '@/sections/Navbar'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Index = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [highlightedGame, setHighlightedGame] = useState<IGame | null>(null);

  useEffect(() => {
    axios
      .post("/api/getgames", {
        reqType: "GETGAMES"
      })
      .then((response) => {
        if (response.data.exists === true) {
          setGames(response.data.gamelist);
        } else {
          console.log(response.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    axios
      .post("/api/getgames", {
        reqType: "DISCOUNTEDGAME"
      })
      .then((response) => {
        if (response.data.exists === true) {
          setHighlightedGame(response.data.gamelist);
          console.log(response.data.gamelist);
        } else {
          console.log(response.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <>
      <Navbar />
      {highlightedGame !== null && (
        <Highlight game={highlightedGame} index={games.indexOf(highlightedGame)} />
      )}
      <main className='shadow-2xl'>
        <div className='mb-5 giant'>Featured Games</div>
        <div className="grid sm:grid-cols-5 gap-10 grid-cols-2">
          {games && (
            games.map((data, index) => (
              <Entry key={index} entry={data} id={index} />
            ))
          )}
        </div>
      </main>
      <div className="highlight-container">
        <div className="inside-highlight shadow-2xl">
          Unlock your gaming potential with affordable game accounts! Join our group of experts offering the best deals on game accounts at unbeatable prices. Level up your gaming experience today with our wide range of discounted game accounts. Don&apos;t miss out on the opportunity to save big on your favorite games. Get started now!
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Index