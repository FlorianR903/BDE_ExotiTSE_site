import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await fetch('https://api.exotitse.fr/api/products', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`External API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching menu:", error);
    
    // Fallback data for testing/dev when API is down (Error 521 implies server down)
    const fallbackData = {
        success: true,
        data: [
            {
            "id": 1,
            "name": "Dessert Tiramisu café",
            "description": "Tiramisu traditionnel",
            "quantity": 40,
            "price": 1.50,
            "available": true
            },
            {
            "id": 2,
            "name": "Gratin D'Autistois",
            "description": "Gratin cuit à la perfection",
            "quantity": 90,
            "price": 2.50,
            "available": true
            },
            {
            "id": 3,
            "name": "Dessert Muhalabia",
            "description": "Muhalabia crémeuse",
            "quantity": 108,
            "price": 1.50,
            "available": true
            },
            {
            "id": 4,
            "name": "Le Burgwèr",
            "quantity": 0,
            "price": 8.50,
            "available": false
            }
        ],
        total: 4
    };

    return NextResponse.json(fallbackData);
  }
}
