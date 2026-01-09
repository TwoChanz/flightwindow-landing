import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function POST(request: NextRequest) {
  try {
    const { email, droneType } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Insert into waitlist table
    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase().trim(),
          drone_type: droneType?.trim() || null,
          created_at: new Date().toISOString(),
        }
      ])

    if (error) {
      // Handle duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'You are already on the waitlist!' },
          { status: 200 }
        )
      }
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
