import styles from './page.module.css'
import { fetchExerciseByBodyPart, fetchExerciseById, fetchExerciseForDropDown } from './actions';
import { Exercise, ExerciseDropDown, PageProps } from '@/lib/interfaces';
import ShowExerciseResultById from './components/show-exercise-result-by-id/ShowExerciseResultById';
import WorkoutFormWrapper from './components/workout-form-wrapper/WorkoutFormWrapper';
import ShowTheTrainingProgram from './components/show-the-training-program/ShowTheTrainingProgram';
import Slideshow from './components/slide-show/Slideshow';




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

  return (
    <>
      <header className={styles.headers}>
        <div className={styles.slideheaderWrapper}>
          <Slideshow images={images} duration={60} />
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
          <ShowTheTrainingProgram />
        </section>
      </main>
    </>
  )
}


