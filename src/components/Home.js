import React, { useEffect, useState } from 'react';
import '../style/style.css';
import PostSnip from '../components/PostSnip';
import { getAllPosts, getAllCategories, getPostsByCategory, getPostsBySubCategory } from '../services/user.service';




// In the blog home 

// Here, when the user visits Home, an API call will be made
//to grab the data from the database. Upon returning with the data
// we'll map through the data and display it to the homepage

const Home = () => {

// Only additional thing I could add here is to sort by date

    // State to hold the posts and categories
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Click handler to filter the posts by category or subcategory
    const handleClick = (e) => {
        // User clicked 'view all posts', so grab all published posts from API
        if (e.target.className === 'posts-reset') {
            getAllPosts()
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => console.log(error))

            // User selected a category, grab posts by category from backend
        } else if (e.target.className === 'cat-title') {
            getPostsByCategory(e.target.id)
                .then(response => {
                    setPosts(response.data)
                })
                .catch(error => (console.log(error)))

                // User selected a subcategory, grab posts by subcategory
        } else {
            
            // API requires the category id to perform the API call
            let found = categories.filter(cat => {
                return cat.subcategories.find(subcat => {
                    if (subcat === e.target.id) {
                        return subcat;
                    }
                    return null;
                })
            })

            getPostsBySubCategory(found[0]._id, e.target.id)
                .then(response => {
                    setPosts(response.data)
                })
                .catch(error => (console.log(error)))
        }
    }

    // Hook to grab the posts data from the API 
    useEffect(() => {
        getAllPosts()
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => console.log(error))
    }, []);

    // Hook to grab the categories and subcategories from the API
    useEffect(() => {
        getAllCategories()
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => console.log(error))
    }, []);



    // getAllCategories, getPostsByCategory, getPostsBySubCategory 

    return (
        <div className='home-wrapper'>
            <div className='home-cat-wrapper'>
                {categories.map(cat => {
                    return (
                        <div className='cat-wrapper' key={cat._id}>
                            <button className='cat-title' id={cat._id} onClick={handleClick}>{cat.name}</button>
                            <ul className='subcat-wrapper'>
                                {cat.subcategories.map(subcat => {
                                    return (<li key={subcat}>
                                        <button className='subcat-title' id={subcat} onClick={handleClick} >{subcat}</button>
                                    </li>)
                                })}
                            </ul>
                        </div>
                    )
                })}
                <button className='posts-reset' onClick={handleClick}>View All Posts</button>
            </div>
            <div className='home-post-wrapper'>
                {posts.length === 0 ? <h2>No Posts Found</h2>: null}
                {posts.map(post => {
                    return <PostSnip post={post} key={post._id} />
                })}
            </div>
        </div>

    )
}

export default Home