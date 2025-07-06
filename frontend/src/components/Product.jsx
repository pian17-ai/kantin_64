import React, { useState } from 'react'
import Layout from './common/Layout';
import { Link } from  'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                         <nav aria-label="breadcrumb" className='py-4'>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                <Link to="/shop">Shop</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Dummy Product Title
              </li>
            </ol>
          </nav>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-5'>
                    <div className='row'>
                        <div className='col-2'>
                            
                        </div>
                        <div className='col-10'>

                        </div>
                    </div>
                </div>
                <div className='col-md-7'>

                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Product