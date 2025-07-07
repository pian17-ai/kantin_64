import React, { useState } from 'react'
import Layout from './common/Layout';
import { Rating } from 'react-simple-star-rating'
import { Link } from  'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ProductImgOne from '../assets/images/mens/five.jpg';
import ProductImgTwo from '../assets/images/mens/six.jpg';
import ProductImgTheree from '../assets/images/mens/seven.jpg';

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4);

  return (
    <Layout>
        <div className='container product-detail'>
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
            <div className='row mb-5'>
                <div className='col-md-5'>
                    <div className='row'>
                        <div className='col-2'>
                            
                          <Swiper
                              style={{
                                '--swiper-navigation-color': '#000',
                                '--swiper-navigation-color': '#000',
                              }}
                              onSwiper={setThumbsSwiper}
                              loop={true}
                              direction={'vertical'}
                              spaceBetween={10}
                              slidesPerView={6}
                              freeMode={true}
                              watchSlidesProgress={true}
                              modules={[FreeMode, Navigation, Thumbs]}
                              className='mySwiper mt-2'
                              >
                                <SwiperSlide>
                                  <div className='content'>

                                    <img
                                      src={ProductImgOne}
                                      alt=""
                                      height={100}
                                      className='w-100' />

                                  </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <div className='content'>

                                    <img
                                      src={ProductImgTwo}
                                      alt=""
                                      height={100}
                                      className='w-100' />

                                  </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <div className='content'>

                                    <img
                                      src={ProductImgTheree}
                                      alt=""
                                      height={100}
                                      className='w-100' />

                                  </div>
                                </SwiperSlide>
                              </Swiper>

                        </div>
                        <div className='col-10'>

                          <Swiper
                            style={{
                              '--swiper-navigation-color': '#000',
                              '--swiper-pagination-color': '#000',
                            }}
                            loop={true}
                            spaceBetween={0}
                            navigation={true}
                            thumbs={thumbsSwiper ? {swiper: thumbsSwiper} : undefined}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className='mySwiper2'
                            >
                              <SwiperSlide>
                                <div className='content'>

                                  <img 
                                  src={ProductImgOne} 
                                  alt=""
                                  className='w-100' />

                                </div>
                              </SwiperSlide>
                              <SwiperSlide>
                                <div className='content'>

                                  <img 
                                  src={ProductImgTwo} 
                                  alt=""
                                  className='w-100' />

                                </div>
                              </SwiperSlide>
                              <SwiperSlide>
                                <div className='content'>

                                  <img 
                                  src={ProductImgTheree} 
                                  alt=""
                                  className='w-100' />

                                </div>
                              </SwiperSlide>
                            </Swiper>

                        </div>
                    </div>
                </div>
                <div className='col-md-7'>

                  <h2>Dummy Product Title</h2>

                  <div className='d-flex'>
                    <Rating
                    size={20}
                    readonly
                    initialValue={rating}
                            />
                    <span className='pt-1 ps-2'>50 Reviews</span>
                  </div>

                  <div className='price h6 py-3'>
                            Rp5000 <span className='text-decoration-line-through'>Rp10.000</span>
                  </div>

                  <div>
                    100% Makanan Halal<br/>
                    Cobain jajanan dari produk<br/>
                    satria dan pian.
                  </div>

                  <div className='pt-3'>
                            <strong>Ayo Dibeli!</strong>
                  </div>

                  <div className='add-to-cart my-1 '>

                    <button className='btn btn-primary text-uppercase'>Masukan Ke Keranjang</button>
                    

                  </div>

                  <hr />

                  <div>
                    <strong>SKU:</strong>
                    DDXX1234
                  </div>
                </div>
            </div>
            <div className='row pb-5'>
              <div className='col-md-12'>
                <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3">
                  <Tab eventKey="home" title="Description">
                    Tab content for Description

                  </Tab>
                  <Tab eventKey="profile" title="Reviews (50)">
                    Reviews Area

                  </Tab>
                  <Tab eventKey="contact" title="Contact" disabled>
                    Tab content for Contact

                  </Tab>
                </Tabs>

              </div>
            </div>
        </div>
    </Layout>
  )
}

export default Product