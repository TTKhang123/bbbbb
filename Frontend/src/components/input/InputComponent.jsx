import { Input } from 'antd'
import React from 'react'

const InputComponent = ({size, placeholder, style, borderless, ...props}) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      borderless ={borderless}
      style ={style}
      {...props}
    />
  )
}

export default InputComponent