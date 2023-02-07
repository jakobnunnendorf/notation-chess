import React from 'react'

export default function GuidingRows() {
    // label the rows with numbers like 1-8
    const guidingRows =[] //Stores the row etiquettes
    for(let i=8; i>0; i--){
        guidingRows.push(<div className="square">{i}</div>)
    }
  return (
    <div className='guiding-rows'>
    {guidingRows}
    </div>
  )
}
