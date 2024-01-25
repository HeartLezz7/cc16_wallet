-- AlterTable
ALTER TABLE `Account` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `transaction_date` DATE NULL,
    MODIFY `payer_name` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `deletedAt` DATETIME(3) NULL;
