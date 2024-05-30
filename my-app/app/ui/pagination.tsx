"use client";

import { ListProps } from "@/app/lib/definitions";
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDataDb } from '@/app/utils/api-requests';
import Link from "next/link";
import IndexPages from '@/app/ui/index-pages';

//without useQuery
//export default function Pagination({listArticles}: {listArticles: ListProps[]}) {
export default function Pagination() {

    const { data, isLoading, isError, error } = useQuery<ListProps[]>({
        queryKey: ["hydrate-users"],
        queryFn: () => getDataDb(),
        staleTime: 60 * 1000 * 5,
    });

    //Don't do this !!!
    //const [data] = useState<ListProps[] | undefined>(data);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredArticles, setFilteredArticles] = useState<ListProps[] | undefined>([]);

    const articlesPerPage = 3;
    
    useEffect(() => {
        const caller = () => {
            if (searchTerm.trim() !== '') {
                const result: ListProps[] | undefined = data?.filter((article: ListProps) => (
                    article.title.toLowerCase().includes(searchTerm.toLowerCase())
                ));
                setFilteredArticles(result);
            } else {
                setFilteredArticles([]);
            }
        }
        caller();
        return () => console.log("clean-up !");
    }, [searchTerm, data]);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = data?.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };
    
    const totalPages = data !== undefined ? Math.ceil(data.length / articlesPerPage) : undefined; // 4
    
    if (isLoading) {
        return <div>Loading...</div>
    };

    if (!data) {
        return <div>No data</div>
    } else {
    console.log("data + cores : ", data)
    };

    if (isError) {
        return <h2>{error.message}</h2>
    };

    return (
        <div>
            <h1 className='text-3xl font-bold p-4'>Articles</h1>
            <div className="mx-4">
                <label htmlFor="search" className='text-xl font-bold'>Search: </label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-2/5 text-md text-slate-800 px-2 py-1 border border-gray-400 rounded"
                />
            </div>

            {searchTerm !== "" ? (
                <div className="h-auto bg-slate-800 rounded-md m-4 p-4">
                    {filteredArticles?.map((art: ListProps) => (
                        <li key={art.id}
                            className='text-blue-200 hover:text-blue-300 list-none active:text-blue-400'>
                            <Link href={`/pagination/${art.id}`} prefetch={false}>
                                {art.id} - {art.title} - {art.rubrique}
                            </Link>
                        </li>
                    ))}
                </div>
            ) : (
                <div className="m-4">
                </div>
            )}

            <ul className="bg-gray-700 rounded-tl-lg rounded-tr-lg p-4 mx-4">
            {currentArticles !== undefined && currentArticles.length > 0 ? (
                currentArticles?.map((article: ListProps) => (
                    <li key={article.id} className='w-auto bg-slate-800 rounded-md p-2 m-2'>
                        <Link href={`/pagination/${article.id}`} prefetch={false} 
                            className="text-xl text-cyan-300">
                            {article.title}
                        </Link>
                        <p>{article.rubrique}</p>
                    </li>
                ))): null}
            </ul>
            <IndexPages
                totalPages={totalPages}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};