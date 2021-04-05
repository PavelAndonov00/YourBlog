import React, { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import './Home.css';
import Blog from '../Blog';
import Context from '../../contexts/context';

const Home = ({ scrollTop }) => {
    let context = useContext(Context);

    var [items, setItems] = useState(Array.from({ length: 5 }));

    const fetchData = () => {
        setTimeout(() => {
            setItems(items.concat(Array.from({ length: 5 })))
        }, 2000)
    }

    const scrollToTop = () => {
        scrollTop.current.scrollIntoView();
    }

    useEffect(() => {
        if (context.message) {
            setTimeout(() => {
                context.setMessage("");
            }, 5000);
        }
    }, [])

    return (
        <section className="main-blogs-section">
            <p className="information-message">{context.message}</p>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchData}
                hasMore
                loader={<h4>Loading...</h4>}
            >
                {items.map((item, index) => {
                    return <Blog key={index} />;
                })}
            </InfiniteScroll>
            <Link to="/home/#header" className="scroll-to-top" onClick={scrollToTop}>
                <img className="scroll-to-top-img"
                    src="/up-arrow.svg"
                    alt="Up arrow" />
            </Link>
        </section>
    );
}

export default Home;