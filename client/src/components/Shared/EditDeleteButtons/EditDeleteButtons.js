import { Link } from "react-router-dom";

import './EditDeleteButtons.css';


const EditDeleteButtons = ({
    buttonClassName = "blog-crud-button", id, stopPropagationHandler, onclickDelete
}) => {
    return (
        <>
            <Link className={buttonClassName}
                to={`/blogs/${id}/edit`}
                onClick={stopPropagationHandler}>
                Edit
            </Link>
            <Link className={buttonClassName}
                onClick={onclickDelete}
                to={`/blogs/${id}/delete`}>
                Delete
            </Link>
        </>
    );
}

export default EditDeleteButtons;