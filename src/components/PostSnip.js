import React, { useState, useEffect } from 'react';
import '../style/style.scss';
import { Link } from 'react-router-dom';



const PostSnip = (props) => {
    const { post } = props;

    const [managerStatus, setManagerStatus] = useState(props.manager);

    useEffect(() => {
        console.log(managerStatus)
        // console.log(managerStatus === undefined)
        console.log(props.manager)
    }, [])

    return (
        <Link to={`/post/${post._id}`} className='post-wrapper' key={post._id}>
            <div className='post-header'>
                <h1>{post.title}</h1>
                <div>
                    {managerStatus === undefined ? <h3>Author: {post.author.username}</h3> : null}
                    <h3>{post.date.slice(0, 10)}</h3>
                </div>
            </div>
            <div className='content-wrapper'>
                <p>{`${post.content.slice(0, 200)}...`}</p>
            </div>
        </Link>
    )

}

export default PostSnip;