import { z } from 'zod';

export const titleType = ['movie', 'series'] as const;
const titleTypeEnum = z.enum(titleType);
export type TitleType = z.infer<typeof titleTypeEnum>;

const titleFormat = ['digital', 'dvd'] as const;
const titleFormatEnum = z.enum(titleFormat);
export type TitleFormat = z.infer<typeof titleFormatEnum>;
