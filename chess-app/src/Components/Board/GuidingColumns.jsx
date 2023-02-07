import React from 'react'

export default function GuidingColumns() {
    // label the columns with letters like A-H
    const alphabet = ['A','B','C','D','E','F','G','H']
    const guidingCols=[]//Stores the column etiquettes
    for(let i=0; i<9; i++){
        guidingCols.push(<div className="square">{alphabet[i]}</div>)
    }
  return (
    <div className='guiding-cols'>
        {guidingCols}
    </div>
  )
}
