import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const term = searchParams.get('term')

  if (!term) {
    return NextResponse.json(
      { statusCode: 400, message: 'Missing term' },
      { status: 400 }
    )
  }

  try {
    const externalRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/media?term=${encodeURIComponent(term)}`
    )

    if (!externalRes.ok) {
      const errorData = await externalRes.json().catch(() => null)
      return NextResponse.json(
        {
          statusCode: externalRes.status,
          message: errorData?.message || 'External API error',
        },
        { status: externalRes.status }
      )
    }

    const data = await externalRes.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { statusCode: 500, message: 'Proxy failed' },
      { status: 500 }
    )
  }
}
