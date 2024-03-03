'use client'
import { useEffect, useRef, useState } from "react"
import { FaCat } from "react-icons/fa";
import { FaBomb } from "react-icons/fa6";
import { IoLogoOctocat } from "react-icons/io";
import { FaShuffle } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";
import toast from "react-hot-toast";

const Card = (props) => {
    const {type,count, setCount ,reset, setReset, canDiffuse, setCanDiffuse, setWonScore, setLostScore} = props;
    const [toggle, setToggle] = useState(true)
    const [remAfterTimeout, setRemAfterTimeout] = useState(false)

    useEffect(() => {
      setToggle(true)
      setRemAfterTimeout(false)
      setCanDiffuse(false)
    }, [count])
    
    const removeCard = () => {
        setTimeout(() => {
            setRemAfterTimeout(true)
        }, 600);
    }

    const reshuffleCards = () => {
        setTimeout(() => {
            setCount((cnt)=> cnt+1)
        }, 2000);
    }

    const handleClick = () => {
        if(type === 'diffuse'){
            setCanDiffuse(true)
        }
        if(type === 'bomb' && !canDiffuse){
            reshuffleCards()
            setLostScore((ls)=> ls+1)
            toast.error('Boom! you have lost the game')
        }
        // if(type === 'cat' )
        if((type === 'cat') ||  (canDiffuse && type === 'bomb'))
        {
            if((canDiffuse && type === 'bomb')){
                removeCard()
                reshuffleCards()
                setWonScore((wn)=> wn+1)
                toast.success('You have won the game!')
            }else{
                removeCard()
            }
            console.log("Removing...", type)
        }
        setReset(false)
        setToggle(false)
        setRemAfterTimeout(false);
    }
  return (
    <div onClick={handleClick} className={`${remAfterTimeout && 'hidden'} ${toggle ?"gradient-border": `bg-zinc-100 border-4 ${(type==='bomb'&&!reset)?"border-red-600": (type==='shuffle'&&!reset)?"border-yellow-600":(!reset)?"border-green-600":"gradient-border"} lg:h-[306px] lg:w-[202px] h-[204px]  w-[151px] rounded-md`}  duration-200 cursor-pointer flex items-center justify-center`}>
        {(toggle || reset) && <IoLogoOctocat className="lg:text-8xl text-7xl sm:text-6xl text-zinc-400 hover:scale-105 duration-300"/>}
        {(!toggle&& !reset && type==='cat' ) && <FaCat className="lg:text-8xl text-7xl text-pink-400"/>}
        {(!toggle&& !reset && type==='bomb' ) && <FaBomb className="lg:text-8xl text-7xl text-black"/>}
        {(!toggle&& !reset && type==='diffuse' ) && <FaTools className="lg:text-8xl text-7xl text-gray-500"/>}
        {(!toggle&& !reset && type==='shuffle' ) && <FaShuffle className="lg:text-8xl text-7xl text-yellow-400"/>}
    </div>
  )
}

export default Card
