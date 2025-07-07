import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import ProductImg from '../assets/images/mens/seven.jpg'

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('qris');

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }
  return (
    <Layout>
        <div className='container pb-5'>
            <div className='row'>
                <div className='col-md-12'>
                         <nav aria-label="breadcrumb" className='py-4'>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Checkout
              </li>
            </ol>
          </nav>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-7'>
                    <h3 className='border-bottom pb-3'><strong>Pembayaran</strong></h3>
                    <form action="">
                        <div className='row pt-3'>
                            <div className='col-md-6'>
                                <div className='mb-3'>
                                     <input type="text" className='form-control' placeholder='Nama Lengkap' />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='mb-3'>
                                    <input type="text" className='form-control' placeholder='Kelas' />
                                </div>
                            </div>
                                <div className='mb-3'>
                                    <textarea className='form-control' rows={3} placeholder='Addres'>

                                    </textarea>
                                </div>
                        </div>
                    </form>
                </div>
                    <div className='col-md-5'>
                        <h3 className='border-bottom pb-3'><strong>Pemakaian</strong></h3>
                        <table className='table'>
                                                <tbody>
                                                    <tr>
                                                        <td width={100}>
                                                            <img src={ProductImg} width={80} alt="" />
                                                        </td>
                                                        <td width={600}>
                                                                <h4>Dummy Product Title</h4>
                                                            <div className='d-flex align-items-center'>
                                                                <span>Rp5000</span>
                                                                <div className='ps-2'>x 1</div>
                                                            </div>
                                                        </td>                                                        
                                                    </tr>
                                                    <tr>
                                                        <td width={100}>
                                                            <img src={ProductImg} width={80} alt="" />
                                                        </td>
                                                        <td width={600}>
                                                                <h4>Dummy Product Title</h4>
                                                            <div className='d-flex align-items-center'>
                                                                <span>Rp5000</span>
                                                                <div className='ps-2'>x 1</div>
                                                            </div>
                                                        </td>                                                                                                               
                                                    </tr>
                                                </tbody>
                                            </table>

                                             <div className='row'>
                    <div className='col-md-12'>
                        <div className='d-flex justify-content-between border-bottom pb-2'>
                            <div><strong>Barang Dibeli</strong></div>
                            <div>Rp10.000</div>
                        </div>
                        <div className='d-flex justify-content-between border-bottom py-2'>
                            <div><strong>Pajak</strong></div>
                            <div>Rp5000</div>
                        </div>
                        <div className='d-flex justify-content-between border-bottom py-2'>
                            <div><strong>Total Harga</strong></div>
                            <div>Rp15.000</div>
                        </div>                     
                    </div>
                </div>

                 <h3 className='border-bottom pt-4 pb-3'><strong>Payment Method</strong></h3>

                 <div>
                    <input type="radio"
                    onClick={handlePaymentMethod}
                    checked={paymentMethod == 'bayarditempat'} value={'bayarditempat'} />
                    <label htmlFor="" className='form-label ps-2'>BayarDitempat</label>

                    <input type="radio"
                    onClick={handlePaymentMethod}
                    checked={paymentMethod == 'qris'} value={'qris'} className='ms-3' />
                    <label htmlFor="" className='form-label ps-2'>Qris</label>
                 </div>
                  <div className='d-flex justify-content-end py-3'>
                        <button className='btn btn-primary'>Bayar Sekarang</button>
                        </div>
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default Checkout