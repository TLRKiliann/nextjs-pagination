import { ListProps } from "@/app/lib/definitions";
  
export async function getDataDb() {
    const req = await fetch('/api/articles');
    const data = (await req.json()) as ListProps[];
    return data;
};