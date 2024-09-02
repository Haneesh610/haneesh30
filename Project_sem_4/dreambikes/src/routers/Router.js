import React from 'react'
import {Routes ,Route ,Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import BikeListing from '../pages/BikeListing'
import BikeDetails from '../pages/BikeDetails'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'


const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/bikes" element={<BikeListing />} />
        <Route path="/bikes/:slug" element={<BikeDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default Router