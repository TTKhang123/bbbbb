import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, styleButton, styleTextButton, text, ...props }) => {
  return (
    <Button
      size={size}
      style={styleButton}
      {...props}
    >
      <span style={styleTextButton}>{text}</span>

    </Button>
  )
}

export default ButtonComponent