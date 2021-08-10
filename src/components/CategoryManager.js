import React, { useEffect, useState } from 'react';
import { getAllCategories, postCategory, postSubCategory } from '../services/user.service';

const CategoryManager = () => {


    // Could possibly change this to a reducer hook?
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSection, setNewSection] = useState('');
    const [newInput, setNewInput] = useState('');
    const [error, setError] = useState('');

    // Saves the incoming text input
    const handleChange = (e) => {
        setNewInput(e.target.value);
    }

    // Adds a text input for a new subcategory to the JSX by setting the newSubcat state
    const handleClick = (e) => {
        setNewInput('');            //Clear the old input
        setError('');
        setNewSection(e.target.id)
    }

    // Handles submitting a new cat/subcat
    const handleSubmit = (e) => {
        e.preventDefault();

        // Error handling
        if (newInput.length < 3 || newInput.length > 25) {
            setError('Must be 3-25 characters in length');
            return;
        } else {
            setError('');
        }

        // If true, create a new category
        if (e.target.id === 'category') {
            postCategory(newInput)
                .then(results => {
                    console.log(results)
                    setCategories([])
                    setNewInput('');
                    setNewSection('');
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            // Add a new subcategory
            postSubCategory(newSection, newInput)
                .then(results => {
                    console.log(results)
                    setCategories([])
                    setNewInput('');
                    setNewSection('');
                })
                .catch(err => {
                    console.log(err.response)
                })
            console.log(`Would add new subcat: ${newInput} to category: ${newSection}`)
        }
    }

    // Effect hook to grab the categories from the backend
    useEffect(() => {
        console.log('checking')
        if (categories.length === 0) {

            getAllCategories()
                .then(response => {
                    setLoading(false)
                    setCategories(response.data.categories);
                })
                .catch(error => console.log(error))
        }
    }, [categories])


    return (
        <div className='form-page-wrapper'>
            {loading ? <div>Loading</div> :
                <div className='form-element form-radios cat-radios'>
                    {categories.map(cat => {
                        return (
                            <div className='cat-radio-container' key={cat._id}>
                                <h4>{cat.name}</h4>
                                <ul>
                                    {cat.subcategories.map(subcat => {
                                        return (
                                            <li key={subcat}>{subcat}</li>
                                        )
                                    })
                                    }
                                </ul>
                                {newSection !== cat._id ?
                                    <button onClick={handleClick} id={cat._id}> Add</button>
                                    :
                                    <div>
                                        <input type='text' placeholder='New Subcategory' id='new-subcat' name='new-subcat' onChange={handleChange} />
                                        {error ? <p>{error}</p> : null}
                                        <button onClick={handleSubmit} id={cat._id} > Add</button>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    <div className='new-cat-wrapper'>
                        {newSection !== 'category' ?
                            <button onClick={handleClick} id='category'> New Category</button>
                            :
                            <div>
                                <input type='text' placeholder='New Category' id='new-cat' name='new-cat' onChange={handleChange} />
                                {error ? <p>{error}</p> : null}
                                <button onClick={handleSubmit} className='new-button' id='category'> New Category</button>
                            </div>
                        }

                    </div>
                </div>
            }
        </div>
    )

}

export default CategoryManager;