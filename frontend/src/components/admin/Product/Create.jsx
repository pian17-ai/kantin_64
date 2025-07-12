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
    const [gallery, setGallery] = useState([])
    const [galleryImages, setGalleryImages] = useState([])
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
        setError,
        formState: { errors },
    } = useForm();

    const saveProduct = async (data) => {
        const formData = {...data, "description": content, "gallery": gallery }
        setDisable(true);
        const res = await fetch(`${apiUrl}/products`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(result => {
                setDisable(false);
                if (result.status == 200) {
                    toast.success(result.message);
                    navigate('/admin/products')
                } else {
                    const formErrors = result.errors;
                    Object.keys(formErrors).forEach((field) => {
                        setError(field, { message: formErrors[field][0] });
                    })
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

    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        setDisable(true)

        const res = await fetch(`${apiUrl}/temp-images`, {
            method: 'POST',
            headers: {
                'Accept': 'apllication/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: formData
        }).then(res => res.json())
            .then(result => {
                gallery.push(result.data.id);
                setGallery(gallery)

                galleryImages.push(result.data.image_url)
                setGalleryImages(galleryImages)
                setDisable(false)
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
                                                 <select 
                                                 {
                                                    ...register('category', {
                                                required: 'Please select a Category'
                                            })
                                            } 
                                            className={`form-control ${errors.category && 'is-invalid'}`}
                                            >
                                                <option value="">Select a Category</option>
                                                    {
                                                    categories && categories.map((category) => {
                                                        return (
                                                            <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                             {
                                            errors.category && <p className='invalid-feedback'>{errors.category?.message}</p>
                                        }
                                           </div>
                                        </div>
                                        <div className='col-md-6'>
                                              <div className='mb-3'>
                                                <label className='form-label' htmlFor="">Penjual</label>
                                                 <select 
                                                 {
                                                    ...register('brand')
                                            } 
                                                 className='form-control'>
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
                                        <textarea 
                                        {
                                                    ...register('short_description')
                                        } 
                                         className='form-control' placeholder='Short Description' rows={3}></textarea>
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

                                    <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                                    <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className='mb-3'>
                                                        <label htmlFor="" className='form-label'>Price</label>
                                                        <input
                                                         {
                                                    ...register('price', {
                                                required: 'The price field is required'
                                            })
                                            } 
                                            className={`form-control ${errors.price && 'is-invalid'}`}
                                                        type="text" placeholder='Price'/>
                                                         {
                                            errors.price && <p className='invalid-feedback'>{errors.price?.message}</p>
                                        }
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='mb-3'>
                                                        <label htmlFor="" className='form-label'>Discounted Price</label>
                                                        <input
                                                        {
                                                    ...register('compare_price')
                                                        } 
                                                        type="text" placeholder='Discounted Price' className='form-control' />
                                                    </div>
                                                </div>
                                                <h3 className="py-3 border-bottom mb-3">inventory</h3>
                                                <div className='col-md-6'>
                                                    <div className='mb-3'>
                                                        <label htmlFor="" className='form-label'>Sku</label>
                                                        <input
                                                         {
                                                    ...register('sku', {
                                                required: 'The sku field is required'
                                            })
                                            } 
                                            className={`form-control ${errors.sku && 'is-invalid'}`}
                                                        type="text" placeholder='Sku'/>
                                                         {
                                            errors.sku && <p className='invalid-feedback'>{errors.sku?.message}</p>
                                        }
                                                </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='mb-3'>
                                                        <label htmlFor="" className='form-label'>Barcode</label>
                                                        <input
                                                        {
                                                    ...register('barcode')
                                            } 
                                                        type="text" placeholder='Barcode' className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className='mb-3'>
                                                        <label htmlFor="" className='form-label'>Qty</label>
                                                        <input
                                                        {
                                                    ...register('qty')
                                            } 
                                                        type="text" placeholder='qty' className='form-control' />
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
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

                                                    <div className='mb-3'>
                                        <label htmlFor="" className='form-label'>
                                            Featured
                                        </label>
                                        <select
                                            {...register('is_featured', {
                                                required: 'This field is required'
                                            })
                                            }   
                                            className={`form-control ${errors.status && 'is-invalid'}`}
                                        >
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                        {

                                            errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                        }
                                              </div>                                         

                                    <h3 className="py-3 border-bottom mb-3">Galerry</h3>
                                     <div className='mb-3'>
                                                        <label htmlFor="" className='form-label'>Image</label>
                                                        <input
                                                        onChange={handleFile}
                                                        type="file" className='form-control' />
                                                    </div>

                                                   <div className='mb-3'>
                                                    <div className='row'>
                                                        {
                                                            galleryImages && galleryImages.map((image, index) => {
                                                                return(
                                                                    <div className='col-md-3' key={`image-${index}`}>
                                                                        <div className='card shadow'>
                                                                            <img src={image} alt="" className='w-100'/>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    </div> 

                                </div>
                            </div>
                            <button
                                disabled={disable}
                                type='submit' className='btn btn-primary mt-3 mb-5'>Create</button>
                        </form>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Create