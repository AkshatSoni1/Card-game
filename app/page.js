'use client'
import Card from '@/components/card'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [count, setCount] = useState(0)
  const [wonScore, setWonScore] = useState(0)
  const [lostScore, setLostScore] = useState(0)

  let cardArray = ["cat", "diffuse", "cat", "bomb", "shuffle", "cat"]
  // let cardArray = ["cat", "diffuse", "cat", "bomb", "cat"]

  const [array, setArray] = useState(cardArray);
  const [reset, setReset] = useState(true);
  const [canDiffuse, setCanDiffuse] = useState(false);
  const [isDiffused, setIsDiffused] = useState(false);

  function getRandomUniqueElements(array, count) {
    const shuffledArray = array.slice();
    const result = [];

    while (result.length < count && shuffledArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * shuffledArray.length);
        const randomElement = shuffledArray.splice(randomIndex, 1)[0];
        result.push(randomElement);
    }

    return result;
}

useEffect(() => {
  cardArray = getRandomUniqueElements(cardArray, 6);
  setArray(cardArray)
}, [count])

  
const handleClick = () => {
  setCount((cnt)=> (cnt+1)%5)
  setReset(true)
}

  return (
    <>
    <div className='fixed bg-zinc-900 h-screen w-screen -z-10'>
    </div>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex gap-4 pt-10 max-sm:pt-5">
        <h1 className='text-gray-100 text-2xl'>Won : <span className='text-green-200 text-xl'>{wonScore}</span></h1>
        <h1 className='text-gray-100 text-2xl'>Lost : <span className='text-red-200 text-xl'>{lostScore}</span></h1>
      </div>
    <div className='flex flex-wrap items-center justify-center lg:min-h-[70vh] sm:py-10 sm:px-40 max-sm:py-5 h-1/2 gap-8'>
      {array.map((idx,i)=>(
        <Card key={i} type={idx} count={count} setCount={setCount} reset={reset} setReset={setReset} canDiffuse={canDiffuse} setCanDiffuse={setCanDiffuse} setWonScore={setWonScore} setLostScore={setLostScore}/>
      ))}
    </div>
      <div onClick={handleClick} className="text-gray-100 w-fit text-center border-2 border-t-purple-400 border-s-purple-400 border-b-pink-400 border-r-pink-400 border-white px-5 py-4 font-semibold rounded-xl hover:text-zinc-900 hover:bg-gradient-to-br hover:from-purple-400 hover:to-pink-400 cursor-pointer m-4">
        Re-Shuffle
      </div>
    </div>
    </>
  )
}

export default Home
