import { Metadata } from 'next';
import { ListProps } from "@/app/lib/definitions";
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listArticles } from '@/app/lib/articlelist';

type ParamsArticleIdProps = {
    articleId: string;
}

type ParamsProps = {
    params: {
        articleId: string;
    }
}

export const generateMetadata = async ({params}: ParamsProps): Promise<Metadata> => {
    const title = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Article ${params.articleId}`)
        }, 300)
    })
    return {
        title: `Page ${title}`
    }
};

export default async function LayoutPage({ params, children }: {
    params: ParamsArticleIdProps, 
    children: React.ReactNode }) {

    if (parseInt(params.articleId) !== Number(params.articleId)) {
        throw new Error('Article should be a number between 1-12');
    }

    if (parseInt(params.articleId) > 12) {
        notFound();
    }

    return (
        <div>
            {children}
            {listArticles.map((article: ListProps) => (
                article.id === parseInt(params.articleId) ? (
                    <div key={article.id}>
                        <p className='text-xl font-bold p-4 pb-3'>
                            {article.id}) {article.title}
                        </p>
                        <p className='text-md font-bold mb-3 px-4'>
                            {article.rubrique}
                        </p>
                        <p className='text-md font-bold mb-3 px-4'>
                            <i className='text-cyan-300'>{article.text}</i>
                        </p>

                    </div>
                ) : null
            ))}
            <li className='text-md text-cyan-300 px-4 hover:text-cyan-400 active:text-cyan-500'>
                <Link href={'/'}>Back to Home</Link>
            </li>
        </div>
    )
}
