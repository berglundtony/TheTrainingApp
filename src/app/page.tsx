
// import BodyPartExerciseClient from './components/body-part-exercise-client/BodyPartExerciseClient';
// import dynamic from "next/dynamic";
import styles from './page.module.css'
// import { createServerClient } from "@/lib/supabase/server";
import { fetchExerciseByBodyPart, fetchExerciseById, fetchExerciseForDropDown} from './actions';
import { Exercise, ExerciseDropDown} from '@/lib/interfaces';
import BodyPartExerciseClient from './components/body-part-exercise-client/BodyPartExerciseClient';
import ShowExerciseResultById from './components/show-exercise-result-by-id/ShowExerciseResultById';
import CreateWorkoutClient from './components/create-workout-client/CreateWorkoutClient';
import SupersetPending from './components/superset-pending/SupersetPending';
// import { createServerClient } from '@/lib/supabase/server';
// import dynamic from 'next/dynamic';
// import CreateWorkoutClient from './components/create-workout-client/CreateWorkoutClient';

// const CreateWorkoutClient = dynamic(() => import("./components/create-workout-client/CreateWorkoutClient"), {
//   ssr: false
// });

type PageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function CreateWorkout({ searchParams }: PageProps) {
  // const supabase = createServerClient();
  // const {
    // data: { session },
  // } = await supabase.auth.getSession();
  const rawFilterBy = searchParams?.filterBy ?? "none";
  const filterBy = decodeURIComponent(Array.isArray(rawFilterBy) ? rawFilterBy[0] : rawFilterBy);
  const exerciseParam = searchParams?.exercise ?? undefined;
  console.log("filterBy:", filterBy);
  const exerciseId = typeof exerciseParam === 'string' ? exerciseParam : 'none';

 
  let allExercises: ExerciseDropDown[] = [];
  allExercises = (await fetchExerciseForDropDown()).map(exercise => ({
    exerciseId: exercise.exerciseId,
    name: exercise.name,
    bodyParts: exercise.bodyParts
  }));

  console.log("Loading exercises for body part:", filterBy);
  let filteredExercises: ExerciseDropDown[] = [];
  if (filterBy !== "none") {
    // Filtrera baserat på body part
    filteredExercises = filterBy !== "none" && typeof filterBy === "string"
      ? (await fetchExerciseByBodyPart(filterBy)).map(exercise => ({
          exerciseId: exercise.exerciseId,
          name: exercise.name,
          bodyParts: exercise.bodyParts
        }))
      : [];
  }
  console.log("Filtered exercises being passed into BodyPartExerciseClient:", filteredExercises);
  let selectedExercise: Exercise| null = null;
  if (exerciseId !== "none") {
    console.log("Exercise selected:", exerciseId);
    const res = await fetchExerciseById(exerciseId);
    selectedExercise = res ?? null;
  }


  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Create Your Workout</h1>
      {/* <h1>Hej {session?.user?.email ?? "Gäst"}</h1> */}
      <CreateWorkoutClient/>
      <BodyPartExerciseClient 
        allExercises={allExercises}
        filteredExercises={filteredExercises} 
        selected={exerciseId} 
      />
      <SupersetPending/>
      <ShowExerciseResultById exercise={selectedExercise || undefined} />
    </main>
  )
}


