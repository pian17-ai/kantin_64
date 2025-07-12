import React, { useEffect, useState, useRef, useMemo } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { adminToken, apiUrl } from '../../common/http'
import JodiEditor from 'jodit-react';

const Create = ({ placeholder }) => {

    const editor = useRef(null);
    const [content, setContent] = useState('');
     const [disable, setDisable] = useState(false)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const navigate = useNavigate();

    const config = useMemo(() => ({
        readonly: false, // all options from http://xdsoft.net/jodit/docs/,
        placeholder: placeholder || ''
    }),
    [placeholder]
);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const saveProduct = async (data) => {
        setDisable(true);
        const res = await fetch(`${apiUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'apllication/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                setDisable(false);
                if (result.status == 200) {
                    toast.success(result.message);
                    navigate('/admin/categories')
                } else {
                    console.log("Sepertinya ada kesalahan")
                }
            })
    }

    const fetchCategories = async () => {
         const res = await fetch(`${apiUrl}/categories`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'apllication/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                setCategories(result.data)
            })
    }

    const fetchBrands = async () => {
          const res = await fetch(`${apiUrl}/brands`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'apllication/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                setBrands(result.data)
            })
    }

    useEffect (() => {
        fetchCategories();
        fetchBrands();
    },[])

  return (
     <Layout>
        <div className='container'>
          <div className='row'>
            <div className='d-flex justify-content-between mt-5 pb-3'>
              <h4 className='h4 pb-0 mb-0'>Menu Makanan / Create</h4>
              <Link to="/admin/products" className="btn btn-primary">Kembali</Link>
              </div>
            <div className='col-md-3'>
              <Sidebar/>
            </div>
            <div className='col-md-9'>
            <form onSubmit={handleSubmit(saveProduct)}>
                            <div className='card shadow'>
                                <div className="card-body p-4">
                                    <div className='mb-3'>
                                        <label htmlFor="" className='form-label'>
                                            Title
                                        </label>
                                        <input
                                            {...register('title', {
                                                required: 'The title field is required'
                                            })
                                            }
                                            type="text"
                                            className={`form-control ${errors.title && 'is-invalid'}`}
                                            placeholder='Title' />
                                        {
                                            errors.title && <p className='invalid-feedback'>{errors.title?.message}</p>
                                        }
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                           <div className='mb-3'>
                                                <label className='form-label' htmlFor="">Category</label>
                                                 <select className='form-control'>
                                                <option value="">Select a Category</option>
                                                    {
                                                    categories && categories.map((category) => {
                                                        return (
                                                            <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                           </div>
                                        </div>
                                        <div className='col-md-6'>
                                              <div className='mb-3'>
                                                <label className='form-label' htmlFor="">Penjual</label>
                                                 <select className='form-control'>
                                                <option value="">Select a Penjual</option>
                                                 {
                                                    brands && brands.map((brand) => {
                                                        return (
                                                            <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                           </div>
                                        </div>                                        
                                    </div>

                                    <div>
                                        <label htmlFor="" className='form-label'>
                                            Short Description
                                        </label>
                                        <textarea className='form-control' placeholder='Short Description' rows={3}></textarea>
                                    </div>

                                    <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>Description</label>
                                                <JodiEditor
                                                ref={editor}
                                                value={content}
                                                config={config}
                                                tabIndex={1}
                                                onBlur={newContent => setContent(newContent)}
                                                />
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor="" className='form-label'>
                                            Status
                                        </label>
                                        <select
                                            {...register('status', {
                                                required: 'Please select a status'
                                            })
                                            }
                                            className={`form-control ${errors.status && 'is-invalid'}`}
                                        >
                                            <option value="">Select a status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>
                                        {

                                            errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <button
                                disabled={disable}
                                type='submit' className='btn btn-primary mt-3'>Create</button>
                        </form>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Create