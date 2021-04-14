import { useContext, useEffect, useState } from 'react';

import './YourBlogs.css';
import { getAllByAuthor } from '../../services/blogService';
import Blogs from './Blogs';
import { Link } from 'react-router-dom';

const YourBlogs = ({ match }) => {
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
            try {
                let result = await getAllByAuthor(match.params.username);
                setBlogs(result);
            } catch (e) {
                console.log(e);
            }
        }

        GetData();
    }, []);

    return (
        <section className="main-yourblogs-section">
            {blogs.length > 0
                ? <Blogs curPageData={curPageData}
                    pageCount={pageCount}
                    handlePageClick={handlePageClick} />

                : <h3 className="main-yourblogs-noblogs">
                    You currently have no blogs. You can <Link to="/blogs/create" className="main-yourblogs-noblogs-create">
                        create
                    </Link> some
                </h3>}
        </section>
    );
}

export default YourBlogs;