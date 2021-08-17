import { Link } from 'react-router-dom';
import htmlDecode from '../services/formatting';

const ProfileComment = (props) => {

    // Destructure props
    const { comment } = props;


    return (
        <div className='comment-container' key={comment._id}>
            <Link to={`/post/${comment.post._id}`}>Post Title: {htmlDecode(comment.post.title)}</Link>
            <p>{htmlDecode(comment.comment)}</p>
            <p>{comment.date.slice(0, 10)}</p>
        </div>
    )
}

export default ProfileComment;