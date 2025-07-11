import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { adminToken, apiUrl } from '../../common/http'
import Loader from '../../common/Loader'
import Nostate from '../../common/Nostate'

const Show = () => {
     const [products, setProducts] = useState([]);
        const [loader, setLoader] = useState(false);
    
        const fetchProducts = async () => {
            setLoader(true)
            const res = await fetch(`${apiUrl}/products`,{
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'apllication/json',
                    'Authorization' : `Bearer ${adminToken()}`
                }
            }).then(res => res.json())
            .then(result => {
                setLoader(false)
                if (result.status == 200) {
                    setProducts(result.data);
                    
    
                }else {
                    console.log("Sepertinya ada kesalahan")
                }
            })
        }

        useEffect(() =>{
            fetchProducts();
        },[])
  return (
    <Layout>
        <div className='container'>
          <div className='row'>
            <div className='d-flex justify-content-between mt-5 pb-3'>
              <h4 className='h4 pb-0 mb-0'>Menu Makanan</h4>
              <Link to="" className="btn btn-primary">Button</Link>
              </div>
            <div className='col-md-3'>
              <Sidebar/>
            </div>
            <div className='col-md-9'>
                <div className='card shadow'>
                    <div className="card-body p-4">
                          {
                    loader == true && <Loader/>
                }

                {
                    loader == false && products.length == 0 && <Nostate text="Menu Makanan tidak ditemukan"/>
                }

                {
                    products && products.length > 0 &&
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Sku</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                }
                    </div>
                </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Show