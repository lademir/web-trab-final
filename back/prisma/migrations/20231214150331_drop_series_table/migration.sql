/*
  Warnings:

  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reps` to the `ExerciseWorkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `ExerciseWorkout` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Series";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseWorkout" (
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "series" INTEGER NOT NULL DEFAULT 1,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("exerciseId", "workoutId"),
    CONSTRAINT "ExerciseWorkout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseWorkout" ("assignedAt", "exerciseId", "workoutId") SELECT "assignedAt", "exerciseId", "workoutId" FROM "ExerciseWorkout";
DROP TABLE "ExerciseWorkout";
ALTER TABLE "new_ExerciseWorkout" RENAME TO "ExerciseWorkout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
