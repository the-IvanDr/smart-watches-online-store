import Head from 'next/head';
import GoUp from '../src/components/GoUp';
import Footer from '../src/sections/Footer';
import Header from '../src/sections/Header';
import Ordering from './../src/sections/Ordering/index';

export default function OrderRegistration(){
    return (
        <div>
            <Head><title>Оформление заказа</title></Head>

            <GoUp />
            <Header />
            <Ordering />
            <Footer />
        </div>
    )
}