-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_receiver_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_sender_id_fkey`;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `receiver_id` INTEGER NULL,
    MODIFY `sender_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
