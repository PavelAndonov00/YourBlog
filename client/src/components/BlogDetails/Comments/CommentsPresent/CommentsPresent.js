import './CommentsPresent.css';

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import Comment from "../Comment";

const CommentsPresent = ({
    comments, isWriting
}) => {
    let [curPage, setCurPage] = useState(0);

    const PER_PAGE = 5;
    const offset = curPage * PER_PAGE;
    const curPageData = comments
        .slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(comments.length / PER_PAGE);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurPage(selectedPage);
    };

    return (
        <article className="comments">
            {curPageData
                .map(c => <Comment key={c.id} {...c} />)}
            {isWriting ? <b>Someone is writing ...</b> : null}
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination-btn-prev"}
                nextLinkClassName={"pagination-btn-next"}
                disabledClassName={"pagination-link-disabled"}
                activeClassName={"pagination-link-active"}
            />
        </article>
    );
}

export default CommentsPresent;