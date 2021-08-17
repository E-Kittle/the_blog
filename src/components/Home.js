import React, { useEffect, useState } from 'react';
import '../style/style.scss';
import PostSnip from '../components/PostSnip';
import { getAllPosts, getAllCategories, getPostsByCategory, getPostsBySubCategory } from '../services/user.service';
import htmlDecode from '../services/formatting';




// In the blog home 


const Home = () => {


    // State to hold the posts and categories
    const [posts, setPosts] = useState([]);         
    const [categories, setCategories] = useState([]);
    
    const [loading, setLoading] = useState(true);       //Used to let user know app is loading
    const [visibility, setVisibility] = useState(true);      //Used to display category menu for small viewscreens
    const [selection, setSelection] = useState('posts-reset');   //Used to add a class to currently selected category

    // Click handler to filter the posts by category or subcategory
    const handleClick = (e) => {
        setLoading(true);             //Resets the loading state - used to inform the user we are processing their request
       
        //The first class associated with each button corresponds to what needs to be filtered
        //This uses the split method to extract the individual classes
        let classes = e.target.className.split(' ');   

        // User clicked 'view all posts', so grab all published posts from API
        // Each conditional sets the selection state to the appropriate value (used to visually indicated current filter)
        // While also setting the loading state to false and setting the posts state
        if (classes[0] === 'posts-reset') {
            setSelection('posts-reset');
            getAllPosts()
                .then(response => {
                    setPosts(response.data);
                    setLoading(false)
                })
                .catch(error => console.log(error))

            // User selected a category, grab posts by category from backend
        } else if (classes[0] === 'cat-title') {
            setSelection(e.target.id)
            getPostsByCategory(e.target.id)
                .then(response => {
                    setPosts(response.data)
                    setLoading(false)
                })
                .catch(error => (console.log(error)))

            // User selected a subcategory, grab posts by subcategory
        } else {
            setSelection(e.target.id)

            // API requires the category id to perform the API call so filter through the category state to find the appropriate id
            let found = categories.filter(cat => {
                return cat.subcategories.find(subcat => {
                    if (subcat === e.target.id) {
                        return subcat;
                    }
                    return null;
                })
            })

            // Make the API call
            getPostsBySubCategory(found[0]._id, e.target.id)
                .then(response => {
                    setPosts(response.data)
                    setLoading(false)
                })
                .catch(error => (console.log(error.response)))
        }
    }

    // Hook to grab the posts data from the API 
    useEffect(() => {
        getAllPosts()
            .then(response => {
                setPosts(response.data);
                setLoading(false)
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


    return (
        <div className='home-wrapper'>
            <div className='home-cat-wrapper'>
                <div className='cat-filter-wrapper'>
                    <h3 className='cat-filter'>Filter by Category</h3>
                    {/* Visibility state is toggled with this button - Used to display drop down*/}
                    <button className='cat-filter-button' onClick={() => {setVisibility(!visibility)}}>+</button>
                </div>
                {/* This is hidden by default on small screens, the visibility state toggles its classes */}
                <div  className={visibility? 'display-cats': 'display-menu'}>

                    {/* Loops through each category and its subcategories, displaying them as buttons that the user */}
                    {/* Can click to filter the posts */}
                    {categories.map(cat => {
                        if (cat.subcategories.length === 0) return null
                        else {
                            return (
                                <div className='cat-wrapper' key={cat._id}>
                                    <button className={selection ===cat._id ? 'cat-title cat-button active' : 'cat-title cat-button'} id={cat._id} onClick={handleClick}>{htmlDecode(cat.name)}</button>
                                    <ul className='subcat-wrapper'>
                                        {cat.subcategories.map(subcat => {
                                            return (<li key={subcat}>
                                                <button className={selection === subcat ? 'subcat-title cat-button active' : 'subcat-title cat-button'} id={subcat} onClick={handleClick} >{htmlDecode(subcat)}</button>
                                            </li>)
                                        })}
                                    </ul>
                                </div>
                            )
                        }
                    })}
                    {/* Button to reset the posts and grab all published posts from API */}
                    <button className={selection==='posts-reset' ? 'posts-reset cat-button active' : 'posts-reset cat-button' } onClick={handleClick}>View All Posts</button>
                </div>
            </div>

            {/* Section for posts - If loading is true display a message indicating the page is loading */}
            {loading ? <h1>Loading...</h1> :
                <div className='home-post-wrapper'>
                    {posts.length === 0 ? <h2>No Posts Found</h2> : null}
                    {
                        // Loops through posts to display each post to the DOM
                        posts.map(post => {
                            return <PostSnip post={post} key={post._id} />
                        })
                    }
                </div>
            }
        </div>

    )
}

export default Home