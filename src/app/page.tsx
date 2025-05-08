"use server"

import styles from './page.module.css'
import { fetchExerciseByBodyPart, fetchExerciseById, fetchExerciseForDropDown } from './actions';
import { Exercise, ExerciseDropDown, PageProps } from '@/lib/interfaces';
import Slideshow from './components/slide-show/Slideshow';
import WorkoutAccordionClient from './components/workout-accordion-client/WorkoutAccordionClient';
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from '@/lib/supabase/supabase';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function CreateWorkout({ searchParams }: PageProps) {
  const supabase = createServerComponentClient({ cookies: () => cookies() });
  const { data: { session } } = await supabase.auth.getSession();
  console.log("Session in CreateWorkout:", session);

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

  if (!session) {
    redirect("/login");
  }
  console.log("Session:", session);

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
            allExercises={allExercises}
            filteredExercises={filteredExercises}
            selectedExercise={selectedExercise}
            exerciseId={exerciseId}
          />
      </main>
    </>
  )
}


