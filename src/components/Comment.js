import { Link } from 'react-router-dom';

const Comment = (props) => {

    // Destructure props
    const { comment } = props;


    return (
        <div className='comment-container'>
            <div className='comment-meta'>
            {comment.author===null? <h2>Guest</h2> : <Link to={`/profile/${comment.author._id}`}>{comment.author.username}</Link>}
            <p>{comment.date.slice(0, 10)}</p>
            </div>
            <p className='comment'>{comment.comment}</p>
        </div>
    )
}

export default Comment;