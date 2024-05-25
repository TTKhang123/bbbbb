import React from 'react'
import {HeaderComponent} from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../FooterComponent.jsx/FooterComponent'

const DefaultComponent = ({children}) => {
  return (
    <div style={{backgroundColor: '#F7F9FA'}}>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  )
}

export default DefaultComponent