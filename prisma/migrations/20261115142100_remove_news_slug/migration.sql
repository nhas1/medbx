-- DropIndex
DROP INDEX `News_slug_key` ON `News`;

-- AlterTable
ALTER TABLE `News` DROP COLUMN `slug`;
