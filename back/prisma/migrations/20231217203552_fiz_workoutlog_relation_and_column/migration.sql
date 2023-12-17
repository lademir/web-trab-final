/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `WorkoutLog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WorkoutLog` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkoutLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "volume" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "studentId" INTEGER,
    CONSTRAINT "WorkoutLog_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkoutLog_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WorkoutLog" ("createdAt", "id", "volume", "workoutId") SELECT "createdAt", "id", "volume", "workoutId" FROM "WorkoutLog";
DROP TABLE "WorkoutLog";
ALTER TABLE "new_WorkoutLog" RENAME TO "WorkoutLog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
