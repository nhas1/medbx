/*
  Warnings:

  - You are about to drop the column `contentAr` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `contentEn` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `News` DROP COLUMN `contentAr`,
    DROP COLUMN `contentEn`;
