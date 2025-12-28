import { z } from 'zod';
import { filterCriteriaSchema, cvs, analysisResults } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  cvs: {
    upload: {
      method: 'POST',
      path: '/api/cvs/upload',
      // Input is multipart/form-data, not strictly validated by Zod here for the body
      responses: {
        200: z.array(z.custom()),
        500: errorSchemas.internal,
      },
    },
    analyze: {
      method: 'POST',
      path: '/api/cvs/analyze',
      input: filterCriteriaSchema,
      responses: {
        200: z.array(z.object({
          cv: z.custom(),
          analysis: z.custom(),
        })),
        500: errorSchemas.internal,
      },
    },
    rank: {
      method: 'POST',
      path: '/api/cvs/rank',
      responses: {
        200: z.array(z.object({
          cv: z.custom(),
          analysis: z.custom(),
        })),
        500: errorSchemas.internal,
      },
    },
    clear: {
      method: 'POST',
      path: '/api/cvs/clear',
      responses: {
        200: z.object({ message: z.string() }),
      },
    }
  },
};
