/*
  Warnings:

  - You are about to drop the column `boothSize` on the `SponsorLead` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `SponsorLead` table. All the data in the column will be lost.
  - You are about to drop the column `contactRole` on the `SponsorLead` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `SponsorLead` table. All the data in the column will be lost.
  - You are about to drop the column `organization` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp` on the `Visitor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `SponsorLead` DROP COLUMN `boothSize`,
    DROP COLUMN `budget`,
    DROP COLUMN `contactRole`,
    DROP COLUMN `website`;

-- AlterTable
ALTER TABLE `Visitor` DROP COLUMN `organization`,
    DROP COLUMN `whatsapp`;
