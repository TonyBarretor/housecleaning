import { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

// @ts-ignore - NextAuth v5 beta compatibility with Next.js 16
export const GET = handler
// @ts-ignore - NextAuth v5 beta compatibility with Next.js 16
export const POST = handler
