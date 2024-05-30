import { listArticles } from '@/app/lib/articlelist';

export async function GET(req: Request) {
    if (req.url) {
        console.log(req.url);
    } else {
        console.log("method unknown (error)");
    }

    return new Response(JSON.stringify(listArticles), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};
