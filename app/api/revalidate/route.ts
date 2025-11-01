import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Secret token om de API te beschermen
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Check secret token
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Parse webhook body van Sanity
    const body = await request.json();
    
    console.log('Revalidation triggered:', body);

    // Revalideer alle pagina's (je kunt dit specifieker maken)
    revalidatePath('/', 'layout');
    
    // Of specifieke paths:
    // revalidatePath('/');
    // revalidatePath('/wie-we-zijn');
    // revalidatePath('/wat-we-bieden');
    // etc...

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Cache revalidated successfully'
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}

