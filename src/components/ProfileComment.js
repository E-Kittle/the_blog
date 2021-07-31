
const ProfileComment = (props) => {

    // Destructure props
    const { comment } = props;


    return (
        <div className='comment-container' key={comment._id}>
            <a href={`/post/${comment.post._id}`}>Post Title: {comment.post.title}</a>
            <p>{comment.comment}</p>
            <p>{comment.date.slice(0, 10)}</p>
        </div>
    )
}

export default ProfileComment;