import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8001/posts/${postId}/comments`, {
            content
        })

        setContent('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Comment</label>
                    <input
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate;