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
                containerClassName={"pagination"}
                previousLinkClassName={"pagination-btn-prev"}
                nextLinkClassName={"pagination-btn-next"}
                disabledClassName={"pagination-link-disabled"}
                activeClassName={"pagination-link-active"}
            />
        </>
    );
}

export default Blogs;