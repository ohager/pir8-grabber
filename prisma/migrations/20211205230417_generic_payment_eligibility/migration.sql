/*
  Warnings:

  - You are about to drop the column `playStatus` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `playStatus`,
    ADD COLUMN `paymentEligibility` ENUM('Eligible', 'NotEligible') NULL;
