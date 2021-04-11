import Document, { Html, Head, Main, NextScript } from 'next/document';
import Footer from '../src/sections/Footer';
import Header from './../src/sections/Header/index';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="description"
                        content="Интернет-магазин смарт-часов в Украине. Широкий асортимент, низкая цена. Купить смарт-часы на любой вкус онлайн."
                    />
                    
                    <script src="https://kit.fontawesome.com/4fa595bc50.js" crossOrigin="anonymous"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;