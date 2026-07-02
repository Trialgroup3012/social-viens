import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// In development, detect schema changes and regenerate the client if needed.
// In production, just create a single client and cache it globally to avoid
// exhausting DB connections across serverless invocations.
if (process.env.NODE_ENV !== 'production') {
  const expectedModels = [
    'newsletterSubscriber',
    'portfolio',
    'pricingPackage',
    'service',
    'blogPost',
    'testimonial',
    'siteSetting',
    'user',
    'pageContent',
    'chatSession',
    'chatMessage',
    'notification',
  ]
  if (globalForPrisma.prisma) {
    const missing = expectedModels.filter((m) => !(m in (globalForPrisma.prisma as object)))
    if (missing.length > 0) {
      globalForPrisma.prisma?.$disconnect()
      globalForPrisma.prisma = undefined
    }
  }
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
