import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Secret token om de API te beschermen
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Check secret token
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (secret !== REVALIDATE_SECRET) {
      console.log('❌ Invalid secret provided');
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Parse webhook body van Sanity
    const body = await request.json();
    
    console.log('🔄 Revalidation triggered at:', new Date().toISOString());
    console.log('📦 Webhook body:', JSON.stringify(body, null, 2));

    // Lijst van alle paths die we willen revalideren
    const pathsToRevalidate = [
      '/',
      '/wie-we-zijn',
      '/wat-we-bieden',
      '/voor-ouders',
      '/samenwerkingen',
      '/waar-we-voor-staan',
      '/kennismaken-en-aanmelden',
      '/contact',
      '/kwaliteit',
    ];

    // Revalideer alle paths
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path);
        console.log(`✅ Revalidated: ${path}`);
      } catch (error) {
        console.error(`❌ Failed to revalidate ${path}:`, error);
      }
    }

    // Revalideer ook dynamic routes (programma's)
    try {
      revalidatePath('/wat-we-bieden/[slug]', 'page');
      console.log('✅ Revalidated: /wat-we-bieden/[slug]');
    } catch (error) {
      console.error('❌ Failed to revalidate dynamic routes:', error);
    }

    console.log('🎉 Revalidation completed successfully!');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: pathsToRevalidate,
      message: 'Cache revalidated successfully'
    });
  } catch (error) {
    console.error('💥 Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}

