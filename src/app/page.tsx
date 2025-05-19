"use server"

import styles from './page.module.css'
import { fetchExerciseByBodyPart, fetchExerciseById, fetchExerciseForDropDown } from './actions';
import { Exercise, ExerciseDropDown, PageProps } from '@/lib/interfaces';
import Slideshow from './components/slide-show/Slideshow';
import WorkoutAccordionClient from './components/workout-accordion-client/WorkoutAccordionClient';
// Update the import path below to the correct location of your Supabase client
import { createClient } from "src/app/utils/supabase/server";
import { redirect } from 'next/navigation';


export default async function CreateWorkout({ searchParams }: PageProps) {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/login");
  }
  // } else {
  //   const userId = user.id
  // }

  // Retrieve the access token for the authenticated user
  const { data: { session } } = await supabase.auth.getSession();
  const access_token = session?.access_token ?? "";
 
  const images = [
    "/shoulders.jpg",
    "/draginglines.jpg",
    "/fitnessclub.jpg",
    "/pullups.jpg",
    "/hantel.jpg",
    "/barbell.jpg",
    "/concentratecurl.jpg",
    "/skivstang.jpg",
    "/hantel2.jpg",
  ];

  // if (!user) {
  //   redirect("/login");
  // }
  // console.log("User:",user);

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

  console.log("Loading exercises for body part:", allExercises);
  let filteredExercises: ExerciseDropDown[] = [];
  if (filterBy !== "none") {

    filteredExercises = filterBy !== "none" && typeof filterBy === "string"
      ? (await fetchExerciseByBodyPart(filterBy)).map(exercise => ({
        exerciseId: exercise.exerciseId,
        name: exercise.name,
        bodyParts: exercise.bodyParts
      }))
      : [];
  }
  console.log("Filtered exercises being passed into BodyPartExerciseClient:", filteredExercises);
  let selectedExercise: Exercise | null = null;
  if (exerciseId !== "none") {
    const res = await fetchExerciseById(exerciseId);
    selectedExercise = res ?? null;
  }

  return (
    <>
      <header className={styles.headers}>
        <div className={styles.slideheaderWrapper}>
          <Slideshow images={images} duration={60} />
        </div>
      </header>
      <main className={styles.main}>
        <WorkoutAccordionClient
            access_token={access_token}
            allExercises={allExercises}
            filteredExercises={filteredExercises}
            selectedExercise={selectedExercise}
            exerciseId={exerciseId}
          />
      </main>
    </>
  )
}


