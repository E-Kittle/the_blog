
const Comment = (props) => {

    // Destructure props
    const { comment } = props;

    return (
        <div className='comment-container'>
            {comment.name===undefined ? <h2>Guest</h2> : <h2>{comment.name}</h2>}
            <p>{comment.comment}</p>
            <p>{comment.date.slice(0, 10)}</p>
        </div>
    )
}

export default Comment;