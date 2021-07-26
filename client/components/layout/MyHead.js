/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import Head from 'next/head';

const MyHead = (props) => {
    const defaultHead = {
        keywords: 'BrennanNgo,web,nginx,linux,nodejs,vue,react,flutter,react-hooks',
        article_des: 'BrennanNgo，web，vue/react/nodejs/flutter',
        article_title: "BrennanNgo's blog",
    }
    const head = props.info || defaultHead
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
            <meta httpEquiv='Content-Security-Policy' content='block-all-mixed-content' />
            <meta name="viewport"
                content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
            <meta name="renderer" content="webkit" />
            <meta name="keywords" content={head.keywords} />
            <meta name="Description" content={head.article_des} />
            <meta name="author" content="BrennanNgo" />
            <link rel='shortcut icon' type='image/x-icon' href='image-base-url/blog/common/favicon.ico' />
            <meta name="sogou_site_verification" content="RSa1MBtgZI" />
            <title key="viewport">{head.article_title}</title>
            <script src={"/static/js/canvas.js"} ></script>
        </Head>
    )
}
export default MyHead
