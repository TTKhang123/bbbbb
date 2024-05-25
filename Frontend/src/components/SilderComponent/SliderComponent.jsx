import { Image } from 'antd';
import React from 'react'
import Slider from 'react-slick';

const SliderComponent = ({ arrayImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };
    return (
        <Slider {...settings}>
            {arrayImages.map((image) => {
                return (
                    <Image key={image} src={image} alt="slider" preview={false} width="100%" height='420px' />
                )
            })}
        </Slider>
    )
}

export default SliderComponent