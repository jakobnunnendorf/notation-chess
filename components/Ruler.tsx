import { useGame } from "@/context/GameContext"

export default function Ruler(colour: "black"|"white", orientation:"col"|"row"){
    const rulerTiles = []
    const {boardSide, setBoardSide}=useGame()
    for(let i=1; i<9; i++){
rulerTiles.push(colour="white", i)
    }
    return 
}
