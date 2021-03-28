import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import './Home.css';
import Blog from '../Blog';


const Home = () => {
    var [items, setItems] = useState(Array.from({ length: 5 }));

    const fetchData = () => {
        setTimeout(() => {
            setItems(items.concat(Array.from({ length: 5 })))
        }, 2000)
    }

    return (
        <section className="blogs-section">
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
        </section>
    );
}

export default Home;