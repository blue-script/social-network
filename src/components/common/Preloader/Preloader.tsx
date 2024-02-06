import preloader from "../../../assets/images/preloader.svg"
import React from "react"

const Preloader: React.FC = () => {
  return <div style={{backgroundColor: 'white'}}>
    <img src={preloader} alt="loading image"/>
  </div>
}

export default Preloader