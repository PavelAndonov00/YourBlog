import { Link } from "react-router-dom";

import './EditDeleteButtons.css';


const EditDeleteButtons = ({
    buttonClassName = "blog-crud-button", id
}) => {
    const onClickEdit = (ev) => {
        ev.stopPropagation();
    }

    const onClickDelete = (ev) => {
        let doesAgree = window.confirm("Are you sure you want to delete?");
        if(!doesAgree) {
            ev.preventDefault();
        }

        ev.stopPropagation();
    }

    return (
        <>
            <Link className={buttonClassName}
                to={`/blogs/${id}/edit`}
                onClick={onClickEdit}>
                Edit
            </Link>
            <Link className={buttonClassName}
                onClick={onClickDelete}
                to={`/blogs/${id}/delete`}>
                Delete
            </Link>
        </>
    );
}

export default EditDeleteButtons;