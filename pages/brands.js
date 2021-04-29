import Head from 'next/head';

import GoUp from '../src/components/GoUp';
import Header from '../src/sections/Header';
import ViewedProducts from '../src/sections/ViewedProducts';
import Footer from '../src/sections/Footer/index';


export default function Catalog() {
    return (
        <div>
            <Head><title>Time Shop | Brands</title></Head>

            <GoUp />
            <Header activeTab={4} />

            <h2>Бренды</h2>

            <ViewedProducts />

            <Footer />
        </div>
    )
}
