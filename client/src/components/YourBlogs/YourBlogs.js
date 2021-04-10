import ReactPaginate from 'react-paginate';
import { useContext, useEffect, useState } from 'react';

import './YourBlogs.css';
import Blog from '../Blog';
import { getAllByAuthor } from '../../services/blogService';

const YourBlogs = () => {
    let [curPage, setCurPage] = useState(0);
    let [blogs, setBlogs] = useState([]);

    const PER_PAGE = 2;
    const offset = curPage * PER_PAGE;
    const curPageData = blogs
        .slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(blogs.length / PER_PAGE);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurPage(selectedPage);
    };

    useEffect(() => {
        async function GetData() {
            let user = JSON.parse(localStorage.getItem("user"));
            if (user && user.id) {
                let result = await getAllByAuthor(user.id);
                setBlogs(result);
            }
        }

        GetData();
    }, []);

    return (
        <section className="main-yourblogs-section">
            <article className="main-yourblogs-blogs">
                {curPageData
                    .map(b => <Blog key={b.id} {...b}/>)}
            </article>
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