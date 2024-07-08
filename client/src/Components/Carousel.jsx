/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css' 

const Carousel = ({ images }) => {
        const settings = {
            arrows: true,
            dots: true,
            infinite: images.length > 1,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };

        return (
            <div className="slider-container h-[200px] sm:w-[50vw]  w-[90vw] ">
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div  key={index} >
                        <a href={image} target='_blank'>
                            <img src={image} className="object-fill  h-[200px] sm:w-[50vw]  w-[90vw]" alt={`Image ${index}`} /></a>
                        </div>
                    ))}
                </Slider>
            </div>
        );
};

export default Carousel;
