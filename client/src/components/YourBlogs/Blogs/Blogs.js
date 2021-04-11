import './Blogs.css';
import ReactPaginate from 'react-paginate';
import Blog from '../../Blog';

const Blogs = ({
    curPageData, pageCount, handlePageClick
}) => {
    return (
        <>
            <article className="main-yourblogs-blogs">
                {curPageData
                    .map(b => <Blog key={b.id} {...b} />)}
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
        </>
    );
}

export default Blogs;