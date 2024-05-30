import { Metadata } from 'next';
import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDataDb } from "@/app/utils/api-requests";
import Pagination from '@/app/ui/pagination';

export const metadata: Metadata = {
    title: "Pagination",
    description: "access accepted",
};

export default async function Page() {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["hydrate-users"],
      queryFn: getDataDb,
    });
  
    /* 
    without useQuery
    const res = await fetch("/api/articles");
    const data = await res.json(); 
    */

    return (
        <div>
            {/* <Pagination listArticles={data} /> */}
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Pagination />
            </HydrationBoundary>
        </div>
    )
}
