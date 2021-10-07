import React from 'react'
import WelcomeCarousel from './WelcomeCarousel.jsx'
import { LoginForm } from './LoginForm.jsx'

const index = ({ type, img, socialLinks, getPath }) => {
  const [logo] = img
  return (
    <div>
      <div className='sumra-welcome-carousel'>
        <WelcomeCarousel img={img} />
      </div>
      <div className='sumra-welcome-main'>
        <LoginForm
          logoSrc={logo}
          type={type}
          socialLinks={socialLinks}
          getPath={getPath}
        />
      </div>
    </div>
  )
}

export default index
