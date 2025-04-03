"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { fetchExercises } from "./actions";
import { useEffect, useState } from "react";
import { Exercise } from "@/lib/interfaces";


export default function Home() {
  const [data, setData] = useState<Exercise[]>([]);

  useEffect(() => {
    async function getData() {
      const exercises = await fetchExercises();
      setData(exercises);
    }
    getData();
  }, []);
  
  // console.log(data.map(exercise => exercise.exerciseId));
  console.log("Fetched data:", data); 
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <ul className={styles.grid}>
            {
              data.map((exercise: any) => (
                <li key={exercise.exerciseId}>
          
                  <h1>{exercise.name}</h1>
                  <p>{exercise.targetMuscles.join(", ")}</p>
                  <p>{exercise.bodyParts.join(", ")}</p>
                  <p>{exercise.secondaryMuscles.join(", ")}</p>
                  <ul>
                    {exercise.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
