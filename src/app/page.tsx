
// import BodyPartExerciseClient from './components/body-part-exercise-client/BodyPartExerciseClient';
// import dynamic from "next/dynamic";
import styles from './page.module.css'
// import { createServerClient } from "@/lib/supabase/server";
// import { ExerciseResponse } from '@/lib/interfaces';
import { fetchBodyParts, fetchExerciseByBodyPart, fetchExerciseByName} from './actions';
import { Exercise, ExerciseDropDown } from '@/lib/interfaces';
import ShowExerciseResultByName from './components/show-exercise-result-by-name/ShowExerciseResultByName';
import BodyPartExerciseClient from './components/body-part-exercise-client/BodyPartExerciseClient';

// const CreateWorkoutClient = dynamic(() => import("./components/create-workout-client/CreateWorkoutClient"), {
//   ssr: false
// });

export default async function CreateWorkout({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // const supabase = createServerClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  const bodyParts = await fetchBodyParts();
  const filter = searchParams.filterBy as string || 'none';
  console.log("Fetching exercises for:", bodyParts);
  console.log("Loading exercises for body part:", filter);
  let exercises: ExerciseDropDown[] = [];
  if (filter !== "none") {
    exercises = filter !== "none" ? await fetchExerciseByBodyPart(filter) : [];
  }
  const exercise = typeof searchParams.exercise === 'string' ? searchParams.exercise : 'none';
  let selectedExercise: Exercise | undefined = undefined;
  if (exercise !== "none") {
    console.log("Exercise selected:", exercise);
    if(exercises.length > 0) {
      selectedExercise  = await fetchExerciseByName(exercise);
      console.log("Selected exercise:", selectedExercise);
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Create Your Workout</h1>
      {/* <h1>Hej {session?.user?.email ?? "Gäst"}</h1> */}
      {/* <CreateWorkoutClient/> */}
      <BodyPartExerciseClient bodyParts={bodyParts} exercises={exercises} selected={filter} />
      <ShowExerciseResultByName exercise={selectedExercise} /> 
    </main>
  )}
