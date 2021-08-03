import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/user.service'

const CategoryManager = () => {

    const [categories, setCategories] = useState([]);


    const handleChange = (e) => {

    }


    const handleSubmit = (e) => {

    }

    // Effect hook to grab the categories from the backend
    useEffect(() => {
        getAllCategories()
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div className='form-page-wrapper'>
            <div className='form-element form-radios cat-radios'>
                {categories.map(cat => {
                    return (
                        <div className='cat-radio-container' key={cat._id}>
                            <label>{cat.name}</label>
                            {cat.subcategories.map(subcat => {
                                return (
                                    <div>
                                        <label htmlFor={subcat}>{subcat}</label>
                                        <input type='radio' id={subcat} name='subcategory' required onChange={handleChange}></input>
                                    </div>
                                )
                            })
                            }
                            <input type='text' placeholder='New Category' id='new-subcat' name='new-subcat' />
                            <button onClick={handleClick} className='new-button' id='subcategory'> Add New SubCategory</button>

                        </div>
                    )
                })}
                <div className='new-cat-wrapper'>
                    <input type='text' placeholder='New Category' id='new-cat' name='new-cat' />
                    <button onClick={handleClick} className='new-button' id='category'> Add New Category</button>
                </div>
            </div>
        </div>
    )

}

export default Login;