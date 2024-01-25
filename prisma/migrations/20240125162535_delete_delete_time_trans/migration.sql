/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `deletedAt`;
