/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to drop the `driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `driverlocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `riderequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('DRIVER', 'PASSENGER') NOT NULL;

-- DropTable
DROP TABLE `driver`;

-- DropTable
DROP TABLE `driverlocation`;

-- DropTable
DROP TABLE `riderequest`;
