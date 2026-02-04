import db from '@/db';
import { videosTable } from '@/db/schema';

export const list: any = async () => {
    const videos = await  db.select().from(videosTable);

    return videos;
};
