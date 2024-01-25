/*
  Warnings:

  - You are about to alter the column `account_name` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the column `category_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `payee_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `payer_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `payer_name` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `category` on the `account_type` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[account_name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiver_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_type_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_payee_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_payer_id_fkey`;

-- AlterTable
ALTER TABLE `Account` MODIFY `account_name` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `category_id`,
    DROP COLUMN `payee_id`,
    DROP COLUMN `payer_id`,
    ADD COLUMN `description` VARCHAR(50) NULL,
    ADD COLUMN `receiver_id` INTEGER NOT NULL,
    ADD COLUMN `sender_id` INTEGER NOT NULL,
    ADD COLUMN `transaction_type_id` INTEGER NOT NULL,
    MODIFY `payer_name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `email` VARCHAR(50) NOT NULL,
    MODIFY `firstName` VARCHAR(30) NOT NULL,
    MODIFY `lastName` VARCHAR(30) NOT NULL,
    MODIFY `phone` VARCHAR(10) NOT NULL,
    MODIFY `password` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `account_type` MODIFY `category` ENUM('SAVINGS', 'FIXED', 'CURRENT') NOT NULL;

-- DropTable
DROP TABLE `Category`;

-- CreateTable
CREATE TABLE `transaction_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` ENUM('EXPENSES', 'INCOME', 'TRANSFER') NOT NULL,

    UNIQUE INDEX `transaction_type_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Account_account_name_key` ON `Account`(`account_name`);

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_transaction_type_id_fkey` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
