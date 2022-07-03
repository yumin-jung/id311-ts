import Head from 'next/head'

// Website header info
const HeadInfo = ({ title, keyword, contents }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta keyword={keyword}></meta>
            <meta contents={contents}></meta>
        </Head>
    )
}

HeadInfo.defaultProps = {
    title: 'Personal Quiz',
    keyword: 'Personal Quiz',
    contents: 'ID311 final project'
}

export default HeadInfo