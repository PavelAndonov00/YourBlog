import ReactPaginate from 'react-paginate';
import { useState } from 'react';

import './YourBlogs.css';
import Blog from '../Blog';

const YourBlogs = () => {
    var [curPage, setCurPage] = useState(1);
    var data = Array.from({ length: 12 }).map((v, i) => {
        return (
            <>
                <h1 key={i}> Number: {i+1} </h1>
                <Blog key={i + 16}></Blog>
            </>
        )
    });

    const PER_PAGE = 2;
    const offset = curPage * PER_PAGE;
    const curPageData = data
        .slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(data.length / PER_PAGE);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurPage(selectedPage);
    };

    return (
        <section className="main-yourblogs-section">
            {curPageData}
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"main-yourblogs-pagination"}
                previousLinkClassName={"main-yourblogs-pagination-btn-prev"}
                nextLinkClassName={"main-yourblogs-pagination-btn-next"}
                disabledClassName={"main-yourblogs-pagination-link-disabled"}
                activeClassName={"main-yourblogs-pagination-link-active"}
            />
        </section>
    );
}

export default YourBlogs;