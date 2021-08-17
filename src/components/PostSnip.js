import React, { useState, useEffect } from 'react';
import '../style/style.scss';
import { Link } from 'react-router-dom';
import htmlDecode from '../services/formatting';



const PostSnip = (props) => {
    const { post } = props;

    // Extract manager from props - Works as a flag to determine whether or not 
    // author needs to be extracted
    const [managerStatus, setManagerStatus] = useState(props.manager);


    return (
        <Link to={`/post/${post._id}`} className='post-wrapper' key={post._id}>
            <div className='post-header'>
                <h1>{htmlDecode(post.title)}</h1>
                <div>
                    {managerStatus === undefined ? <h3>Author: {htmlDecode(post.author.username)}</h3> : null}
                    <h3>{post.date.slice(0, 10)}</h3>
                </div>
            </div>
            <div className='content-wrapper'>
            <div dangerouslySetInnerHTML={{__html:htmlDecode(`${post.content.slice(0, 200)}...`)}} />
            </div>
        </Link>
    )

}

export default PostSnip;