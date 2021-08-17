import { Link } from 'react-router-dom';
import htmlDecode from '../services/formatting';

const Comment = (props) => {

    // Destructure props
    const { comment } = props;

    // Displays each comments author, date, and content - decoding any escaped characters
    return (
        <div className='comment-container'>
            <div className='comment-meta'>
                {comment.author === null ? <p>Guest</p> : <Link to={`/profile/${comment.author._id}`}>{comment.author.username}</Link>}
                <p>{htmlDecode(comment.date.slice(0, 10))}</p>
            </div>
            <p className='comment'>{comment.comment}</p>
        </div>
    )
}

export default Comment;