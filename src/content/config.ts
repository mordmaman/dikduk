import { z, defineCollection } from 'astro:content';

const lessonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    hebrewTitle: z.string(),
    unit: z.enum([
      'foundations',
      'unit-1',
      'unit-2',
      'unit-3',
      'unit-4',
      'unit-5',
      'unit-6',
      'unit-7',
      'unit-8',
    ]),
    chapter: z.number(),
    weingreenRef: z.string(),
    description: z.string(),
    prerequisites: z.array(z.string()).optional(),
    order: z.number(),
  }),
});

export const collections = {
  lessons: lessonsCollection,
};
