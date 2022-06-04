import React from 'react'

import './freeboard.css'

export interface IFreeboardProps {
  width?: number,
  height?: number
}

const Freeboard: React.FC<IFreeboardProps> = () => {
  return (
    <section className='freeboard'>
      <div className='freeboard--outer'>
        <iframe title='freeboard' src='http://192.168.194.90:3000/@signalk/freeboard-sk/?northup=1&movemap=1' />
      </div>
    </section>
  )
}

export default Freeboard
