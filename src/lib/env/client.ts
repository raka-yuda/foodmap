import { z } from 'zod'

const clientSchema = z.object({
  NEXT_PUBLIC_FEATURE_FLAG_THEME_TOGGLE: z
    .string()
    .transform((val) => val === 'true')
    .optional()
    .default('false'),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
})

export const publicEnv = (() => {
  const publicVars = {
    NEXT_PUBLIC_FEATURE_FLAG_THEME_TOGGLE: process.env.NEXT_PUBLIC_FEATURE_FLAG_THEME_TOGGLE,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  };

  const parsed = clientSchema.safeParse(publicVars)

  if (!parsed.success) {
    console.error('❌ Invalid client-side environment variables:', parsed.error.errors)

    return {
      FEATURE_FLAG_THEME_TOGGLE: false,
      API_BASE_URL: '',
    };
  };
  
  return {
    FEATURE_FLAG_THEME_TOGGLE: process.env.NEXT_PUBLIC_FEATURE_FLAG_THEME_TOGGLE === 'true',
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  }
})()