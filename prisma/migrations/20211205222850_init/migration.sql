-- CreateTable
CREATE TABLE `Parameter` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `account` VARCHAR(191) NOT NULL,
    `minPayout` INTEGER NOT NULL,
    `maxPayout` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `txLimit` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(191) NOT NULL,
    `sender` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `playStatus` ENUM('Won', 'Lost') NOT NULL,

    UNIQUE INDEX `Transaction_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL,
    `updated` DATETIME(3) NOT NULL,
    `receiver` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `status` ENUM('Pending', 'Paid') NOT NULL DEFAULT 'Pending',

    UNIQUE INDEX `Payment_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`transactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;
