
const Comment = (props) => {

    // Destructure props
    const { comment } = props;


    return (
        <div className='comment-container'>
            {comment.author===null? <h2>Guest</h2> : <a href={`/profile/${comment.author._id}`}>{comment.author.username}</a>}
            <p>{comment.comment}</p>
            <p>{comment.date.slice(0, 10)}</p>
        </div>
    )
}

export default Comment;