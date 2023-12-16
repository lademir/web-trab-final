-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseWorkout" (
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "series" INTEGER NOT NULL DEFAULT 1,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "rest" INTEGER NOT NULL DEFAULT 0,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("exerciseId", "workoutId"),
    CONSTRAINT "ExerciseWorkout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExerciseWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseWorkout" ("assignedAt", "exerciseId", "reps", "series", "weight", "workoutId") SELECT "assignedAt", "exerciseId", "reps", "series", "weight", "workoutId" FROM "ExerciseWorkout";
DROP TABLE "ExerciseWorkout";
ALTER TABLE "new_ExerciseWorkout" RENAME TO "ExerciseWorkout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
