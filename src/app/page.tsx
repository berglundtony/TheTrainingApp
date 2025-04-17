import styles from './page.module.css'
import { fetchExerciseByBodyPart, fetchExerciseById, fetchExerciseForDropDown } from './actions';
import { Exercise, ExerciseDropDown } from '@/lib/interfaces';
import ShowExerciseResultById from './components/show-exercise-result-by-id/ShowExerciseResultById';
import WorkoutFormWrapper from './components/workout-form-wrapper/WorkoutFormWrapper';
import ShowTheTrainingProgram from './components/show-the-training-program/ShowTheTrainingProgram';


type PageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function CreateWorkout({ searchParams }: PageProps) {

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
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>CREATE YOUR WORKOUT</h1>
        </div>
        <div className={styles.slideheaderWrapper}>
          <ShowTheTrainingProgram />
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.formSection}>
          <WorkoutFormWrapper
            allExercises={allExercises}
            filteredExercises={filteredExercises}
            selected={exerciseId}
          />
          <ShowExerciseResultById exercise={selectedExercise || undefined} />
        </section>
        <section className={styles.trainingplan}>

        </section>
      </main>
    </>
  )
}


