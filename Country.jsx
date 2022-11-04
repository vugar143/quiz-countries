import React from 'react'

function Country({country}) {
  return (
    <div className='country'>

        <img src={country.flags.svg} alt="" />


    </div>
  )
}

export default Country