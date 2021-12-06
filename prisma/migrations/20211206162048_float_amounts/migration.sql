/*
  Warnings:

  - You are about to alter the column `minPayout` on the `Parameter` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `maxPayout` on the `Parameter` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `minAmount` on the `Parameter` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Parameter` MODIFY `minPayout` DOUBLE NOT NULL,
    MODIFY `maxPayout` DOUBLE NOT NULL,
    MODIFY `minAmount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Payment` MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `amount` DOUBLE NOT NULL;
