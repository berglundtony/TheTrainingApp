// /src/app/api/workouts/route.ts
import { createClient } from '@/src/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('📡 [API] GET /api/workouts anropad');

        const supabase = await createClient();
        console.log('📡 Supabase-klient skapad');

        const { data, error: fetchError } = await supabase
            .from('workouts')
            .select('*');

        console.log('📡 fetchError:', fetchError);
        console.log('📡 data:', data);

        if (fetchError) {
            console.error('❌ Fel vid hämtning:', fetchError);
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('❌ Okänt fel i API-routen:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}



