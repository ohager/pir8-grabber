/*
  Warnings:

  - You are about to drop the column `message` on the `Parameter` table. All the data in the column will be lost.
  - Added the required column `messagePattern` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minAmount` to the `Parameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Parameter` DROP COLUMN `message`,
    ADD COLUMN `messagePattern` VARCHAR(191) NOT NULL,
    ADD COLUMN `minAmount` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `playStatus` ENUM('Waiting', 'Won', 'Lost') NOT NULL DEFAULT 'Waiting';
