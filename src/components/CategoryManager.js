import React, { useEffect, useState } from 'react';
import { getAllCategories, postCategory, postSubCategory } from '../services/user.service';
import htmlDecode from '../services/formatting';

const CategoryManager = () => {
    // state variables
    const [categories, setCategories] = useState([]);   //to hold the categories
    const [loading, setLoading] = useState(true);       //Used to indicate to user that data is loading
    const [newSection, setNewSection] = useState('');   //Used to indicate where to place the text input for a new cat/subcat
    const [newInput, setNewInput] = useState('');       //Used to hold the text input for a new cat/subcat
    const [error, setError] = useState('');             //Used to hold any errors

    // Saves the incoming text input
    const handleChange = (e) => {
        setNewInput(e.target.value);
    }

    // Adds a text input for a new cat/subcategory to the JSX by setting the newSection state
    const handleClick = (e) => {
        setNewInput('');            //Clear the old input and errors
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
                    //Clears the input and section states and clears the categories state, triggering a new API call
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
                    //Clears the input and section states and clears the categories state, triggering a new API call
                    setCategories([])
                    setNewInput('');
                    setNewSection('');
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }

    // Effect hook to grab the categories from the backend
    useEffect(() => {
        if (categories.length === 0) {      //Ensures duplicate API calls are not made

            getAllCategories()
                .then(response => {
                    setLoading(false)       //Clears the loading flag
                    setCategories(response.data.categories);    //Saves the retrieved categories to state
                })
                .catch(error => console.log(error))
        }
    }, [categories])


    return (
        <div className='form-page-wrapper'>
            {/* If the data is still being grabbed from the api, display a loading message */}
            {loading ? <div>Loading</div> :
                <div className='form-element cat-manager-wrapper'>
                    <h1 className='section-title'> Manage Categories</h1>
                    {/* Loops through each category, displaying its name and the associated subcats */}
                    {categories.map(cat => {
                        return (
                            <div className='cat-manager-container' key={cat._id}>
                                <h4 className='cat-title'>{htmlDecode(cat.name)}</h4>
                                <ul>
                                    {/* Display each of the subcategories related to the category */}
                                    {cat.subcategories.map(subcat => {
                                        return (
                                            <li key={subcat}>{htmlDecode(subcat)}</li>
                                        )
                                    })
                                    }
                                </ul>
                                {/*Default shows a button to add a new subcat, if user clicks the button they are presented with the text input */}
                                {newSection !== cat._id ?
                                    <button className='button-style' onClick={handleClick} id={cat._id}> Add Subcategory</button>
                                    :
                                    <div>
                                        <input type='text' placeholder='New Subcategory' id='new-subcat' name='new-subcat' onChange={handleChange} />
                                        {error ? <p>{error}</p> : null}
                                        <button className='button-style' onClick={handleSubmit} id={cat._id} > Save</button>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    <div className='new-cat-wrapper'>
                        {/*Default shows a button to add a new cat, if user clicks the button they are presented with the text input */}
                        {newSection !== 'category' ?
                            <button className='button-style cat-button-style' onClick={handleClick} id='category'> New Category</button>
                            :
                            <div>
                                <input type='text' placeholder='New Category' id='new-cat' name='new-cat' onChange={handleChange} />
                                {error ? <p>{error}</p> : null}
                                <button className='button-style cat-button-style' onClick={handleSubmit} id='category'>Save</button>
                            </div>
                        }

                    </div>
                </div>
            }
        </div>
    )

}

export default CategoryManager;