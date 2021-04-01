import Head from 'next/head';

import GoUp from '../src/components/GoUp';
import Header from '../src/sections/Header';
import BrandsList from '../src/sections/BrandsList';
import Hits from '../src/sections/Hits';
import Promo from '../src/sections/Promo';
import WhomBanner from '../src/sections/WhomBanner';
import Novelty from '../src/sections/Novelty/index';
import About from '../src/sections/About';
import Footer from '../src/sections/Footer/index';


export default function Home() {
    return (
        <div>
            <Head><title>Time Shop</title></Head>

            <GoUp />
            <Header yellow />
            <Promo />
            <BrandsList />
            <Hits />
            <WhomBanner />
            <Novelty />
            <About />
            <Footer />
        </div>
    )
}
