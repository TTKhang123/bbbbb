import React from 'react'
import { Content, LabelStyles, TextStyle } from './style'
import { Checkbox } from 'antd'
const Navigation = () => {
    const onChange = () => {}
    const contentNavigation = (type, options) => {
        switch(type) {
            case 'text':
                return options.map((option) =>
                {
                    return <TextStyle>{option}</TextStyle>
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%' , display: 'flex', flexDirection:'column'}} onChange={onChange}>
                        {options.map((option) => 
                        {
                            return (
                                <Checkbox value={option.value}>{option.label}</Checkbox>
                            )   
                        })}  
                    </Checkbox.Group>
                ) 
            default:
                return{}
        }
    }
  return (
    <div>
        <LabelStyles>Label</LabelStyles>
        <Content>
            {contentNavigation('text', ['Áo quần thể dục','Vải ảo dài','Áo sơ mi','Quần âu','Áo TDTU','Áo khoa'])}
        </Content>
        <Content>
            {contentNavigation('checkbox', [{ value: 'a', label: 'A'},{value: 'b', label: 'B'},{value: 'c', label: 'C'}])}
        </Content>
    </div>
  )
}

export default Navigation