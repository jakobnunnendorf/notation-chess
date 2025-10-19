"use client"
import { useGame } from "@/context/GameContext"

export default function Flip(){
   const {boardSide, setBoardSide}=useGame()
    return <button className="border py-2 px-3 rounded-full mb-8 bg-slate-100 w-16" onClick={()=>setBoardSide(boardSide==="white"?"black":"white")}>Flip</button>
}