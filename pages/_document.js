import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import normalize from '../node_modules/normalize.css/normalize.css';
import stylesheet from './styles.scss';

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                <meta name="viewport" content="initial-scale=1" />
                <style dangerouslySetInnerHTML={{ __html: normalize + stylesheet }} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
