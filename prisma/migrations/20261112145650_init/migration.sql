-- CreateTable
CREATE TABLE `Visitor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `whatsapp` BOOLEAN NOT NULL DEFAULT false,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,
    `specialty` VARCHAR(191) NULL,
    `organization` VARCHAR(191) NULL,
    `jobTitle` VARCHAR(191) NULL,
    `sectors` JSON NOT NULL,
    `reasons` JSON NOT NULL,
    `days` JSON NOT NULL,
    `source` VARCHAR(191) NULL,
    `cvUrl` VARCHAR(191) NULL,
    `marketingOptIn` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Visitor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SponsorLead` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL,
    `contactName` VARCHAR(191) NOT NULL,
    `contactRole` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `tier` VARCHAR(191) NULL,
    `budget` VARCHAR(191) NULL,
    `goals` JSON NOT NULL,
    `needsBooth` BOOLEAN NOT NULL DEFAULT false,
    `boothSize` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
