/*
  Warnings:

  - The primary key for the `ExerciseWorkout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `ExerciseWorkout` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseWorkout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "series" INTEGER NOT NULL DEFAULT 1,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "rest" INTEGER NOT NULL DEFAULT 0,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExerciseWorkout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseWorkout" ("assignedAt", "exerciseId", "reps", "rest", "series", "weight", "workoutId") SELECT "assignedAt", "exerciseId", "reps", "rest", "series", "weight", "workoutId" FROM "ExerciseWorkout";
DROP TABLE "ExerciseWorkout";
ALTER TABLE "new_ExerciseWorkout" RENAME TO "ExerciseWorkout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
