import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from 'swiper/core'
import Slide1 from '../../assets/images/slide-1-min.jpg'
import Slide2 from '../../assets/images/slide-2-min.jpg'
// install Swiper modules

SwiperCore.use([Pagination, Autoplay])

const WelcomeCarousel = ({ img }) => {
  const [logo] = img
  return (
    <Swiper
      className='swiper-container'
      grabCursor={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 30000 }}>
      <SwiperSlide className='swiper-slide'>
        <div
          className='sumra-wallet-slide'
          style={{
            // eslint-disable-next-line max-len
            backgroundImage: `linear-gradient(180deg, rgba(29, 29, 29, 0.24) 0%, rgba(29, 29, 29, 0.33) 30.21%, rgba(10, 10, 10, 0.675) 89.58%),url(${Slide2})`,
          }}>
          <div className='sutisfied-clients'>
            {/*  <img src={CombinedShape} alt='quotes' /> */}
            <svg
              width='35'
              height='27'
              viewBox='0 0 35 27'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.25226 0C3.69466 0 0 3.6826 0 8.22533C0 12.2711 2.93059 15.6347 6.79134 16.3222L2.3516 23.687C2.06589 24.161 2.21945 24.7769 2.69422 25.0612L5.69411 26.8578C6.16695 27.141 6.77979 26.9882 7.06433 26.5162L13.3718 16.0531C13.3718 16.0531 16.5045 11.881 16.5045 8.22533C16.5045 3.6826 12.8099 0 8.25226 0ZM26.7476 0C22.19 0 18.4954 3.6826 18.4954 8.22533C18.4954 12.2711 21.426 15.6347 25.2867 16.3222L20.847 23.687C20.5613 24.161 20.7148 24.7769 21.1896 25.0612L24.1895 26.8578C24.6623 27.141 25.2752 26.9882 25.5597 26.5162L31.8672 16.0531C31.8672 16.0531 34.9999 11.881 34.9999 8.22533C34.9999 3.6826 31.3052 0 26.7476 0Z'
                fill='url(#paint0_linear)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear'
                  x1='17.5'
                  y1='0'
                  x2='17.5'
                  y2='27'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#FD9D04' />
                  <stop offset='1' stopColor='#FA7302' />
                </linearGradient>
              </defs>
            </svg>
            <span>what users are saying about us</span>
          </div>
          <div className='sumra-welcome-testimonials '>
            "Excellent application! It helps to stay in touch with your siblings
            if you are abroad.
            <br />
            Looking forward to many more innovative features and functions."
          </div>
          <div className='sumra-testimonials-author '>Harriet Andersson</div>
        </div>
      </SwiperSlide>

      <SwiperSlide className='swiper-slide'>
        <div
          className='sumra-wallet-slide'
          style={{
            // eslint-disable-next-line max-len
            backgroundImage: `linear-gradient(180deg, rgba(23, 19, 63, 0) 32.29%, rgba(20, 20, 20, 0.9) 100%),url(${Slide1})`,
          }}>
          <div className='sutisfied-clients'>
            {/*  <img src={CombinedShape} alt='quotes' /> */}
            <svg
              width='35'
              height='27'
              viewBox='0 0 35 27'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.25226 0C3.69466 0 0 3.6826 0 8.22533C0 12.2711 2.93059 15.6347 6.79134 16.3222L2.3516 23.687C2.06589 24.161 2.21945 24.7769 2.69422 25.0612L5.69411 26.8578C6.16695 27.141 6.77979 26.9882 7.06433 26.5162L13.3718 16.0531C13.3718 16.0531 16.5045 11.881 16.5045 8.22533C16.5045 3.6826 12.8099 0 8.25226 0ZM26.7476 0C22.19 0 18.4954 3.6826 18.4954 8.22533C18.4954 12.2711 21.426 15.6347 25.2867 16.3222L20.847 23.687C20.5613 24.161 20.7148 24.7769 21.1896 25.0612L24.1895 26.8578C24.6623 27.141 25.2752 26.9882 25.5597 26.5162L31.8672 16.0531C31.8672 16.0531 34.9999 11.881 34.9999 8.22533C34.9999 3.6826 31.3052 0 26.7476 0Z'
                fill='url(#paint0_linear)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear'
                  x1='17.5'
                  y1='0'
                  x2='17.5'
                  y2='27'
                  gradientUnits='userSpaceOnUse'>
                  <stop stopColor='#FD9D04' />
                  <stop offset='1' stopColor='#FA7302' />
                </linearGradient>
              </defs>
            </svg>
            <span>what users are saying about us</span>
          </div>
          <div className='sumra-welcome-testimonials '>
            "The aplication is very simple, even my mom can use it alone. <br />{' '}
            Easy to communicate with friends all over the world."
          </div>
          <div className='sumra-testimonials-author '>Alfred Bianco</div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default WelcomeCarousel
