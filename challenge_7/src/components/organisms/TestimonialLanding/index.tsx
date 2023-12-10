import { Img, Stars, TestimonialButton, TestimonialTitle, Text, Title } from '../..'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { sliderPhoto1, sliderPhoto2 } from '../../../assets';

function TestimonialLanding() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  const prevHandler = () => {
    if(swiperRef) swiperRef.slidePrev();
  };

  const nextHandler = () => {
    if(swiperRef) swiperRef.slideNext();
  };

  return (
    <>
      <div className='relative pb-24'>
        <TestimonialTitle/>
        <Swiper
            spaceBetween={20}
            slidesPerView={1.5}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className='h-64 my-10'
            onSwiper={(swipper) => setSwiperRef(swipper)}
          >
          <SwiperSlide className='border bg-indigo-100 shadow-lg flex items-center gap-16 px-20 rounded'>
            <Img src={sliderPhoto1} alt='people-picture' classname='rounded-full flex-initial w-28'/>
            <div className="flex flex-col gap-3">
              <Stars/>
              <Text text='“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”'/>
              <Title title='John Dee 32, Bromo' classname='font-semibold'/>
            </div>
          </SwiperSlide>
          <SwiperSlide className='border bg-indigo-100  shadow-lg flex items-center gap-16 px-20 rounded'>
            <Img src={sliderPhoto2} alt='people-picture' classname='rounded-full flex-initial w-28'/>
            <div className="flex flex-col gap-3">
              <Stars/>
              <Text text='“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”'/>
              <Title title='John Dee 32, Bromo' classname='font-semibold'/>
            </div>
          </SwiperSlide>
          <SwiperSlide className='border bg-indigo-100  shadow-lg flex items-center gap-16 px-20 rounded'>
            <Img src={sliderPhoto1} alt='people-picture' classname='rounded-full flex-initial w-28'/>
            <div className="flex flex-col gap-3">
              <Stars/>
              <Text text='“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”'/>
              <Title title='John Dee 32, Bromo' classname='font-semibold'/>
            </div>
          </SwiperSlide>
          <SwiperSlide className='border bg-indigo-100  shadow-lg flex items-center gap-16 px-20 rounded'>
            <Img src={sliderPhoto2} alt='people-picture' classname='rounded-full flex-initial w-28'/>
            <div className="flex flex-col gap-3">
              <Stars/>
              <Text text='“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod”'/>
              <Title title='John Dee 32, Bromo' classname='font-semibold'/>
            </div>
          </SwiperSlide>
        </Swiper>
        <TestimonialButton prevHandlerButton={prevHandler} nextHandlerButton={nextHandler}/>
      </div>
    </>
  )
}

export default TestimonialLanding