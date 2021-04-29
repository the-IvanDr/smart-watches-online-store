import Head from 'next/head';

import GoUp from '../../src/components/GoUp';
import Header from '../../src/sections/Header';
import CatalogProducts from '../../src/sections/CatalogProducts';
import ViewedProducts from '../../src/sections/ViewedProducts';
import CatalogHeader from './../../src/sections/CatalogHeader/index';
import Filter from './../../src/sections/Filter/index';
import Footer from './../../src/sections/Footer/index';


export default function Catalog() {
    return (
        <div>
            <Head><title>Time Shop | For kids</title></Head>

            <GoUp />
            <Header activeTab={2} />

            <CatalogHeader title='Детские' bannerImgSrc='/assets/images/catalogs-headers/kids-watches.png' />
            <Filter />
            <CatalogProducts />
            <ViewedProducts />

            <Footer />
        </div>
    )
}
