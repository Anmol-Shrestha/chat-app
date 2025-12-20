import React from 'react'
import {BarLoader} from 'react-spinners'


const override = {
    display: "block",
  margin: "0 auto",

}
function Spinner({color = 'red'}) {
  return (
    <div>
        <BarLoader
        color={color}
      
        cssOverride={override}
        aria-label='Loading...'
        />
    </div>
  )
}

export default Spinner