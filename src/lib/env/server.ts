import { z } from 'zod'

const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
})

type ServerEnvType = z.infer<typeof serverSchema>

export const env = (() => {
  const parsed = serverSchema.safeParse(process.env)
  
  if (!parsed.success) {
    console.error('❌ Invalid server-side environment variables:', parsed.error.errors)
    throw new Error('Invalid server-side environment variables')
  }
  
  return parsed.data
})();