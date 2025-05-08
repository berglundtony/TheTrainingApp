// app/training-program/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ShowTheTrainingProgram from '../components/show-the-training-program/ShowTheTrainingProgram'

export default async function TrainingProgramPage() {
    const supabase = createServerComponentClient({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Om användaren inte är inloggad → redirect till login
    if (!session) {
        redirect('/login')
    }

    return (
        <div>
            <ShowTheTrainingProgram />
        </div>
    )
}