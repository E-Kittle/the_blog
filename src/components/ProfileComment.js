import { Link } from 'react-router-dom';

const ProfileComment = (props) => {

    // Destructure props
    const { comment } = props;


    return (
        <div className='comment-container' key={comment._id}>
            <Link to={`/post/${comment.post._id}`}>Post Title: {comment.post.title}</Link>
            <p>{comment.comment}</p>
            <p>{comment.date.slice(0, 10)}</p>
        </div>
    )
}

export default ProfileComment;