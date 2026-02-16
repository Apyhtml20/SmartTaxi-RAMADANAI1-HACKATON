-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `role` ENUM('PASSENGER', 'DRIVER', 'ADMIN') NOT NULL DEFAULT 'PASSENGER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT false,
    `rating` DOUBLE NOT NULL DEFAULT 5.0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Driver_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DriverLocation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `driverId` INTEGER NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `speed` DOUBLE NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `DriverLocation_driverId_idx`(`driverId`),
    INDEX `DriverLocation_updatedAt_idx`(`updatedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RideRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `passengerId` INTEGER NOT NULL,
    `pickupLat` DOUBLE NOT NULL,
    `pickupLng` DOUBLE NOT NULL,
    `pickupName` VARCHAR(191) NULL,
    `dropLat` DOUBLE NOT NULL,
    `dropLng` DOUBLE NOT NULL,
    `dropName` VARCHAR(191) NULL,
    `seats` INTEGER NOT NULL DEFAULT 1,
    `carpool` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('REQUESTED', 'ASSIGNED', 'PICKED_UP', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'REQUESTED',
    `assignedDriverId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `RideRequest_status_idx`(`status`),
    INDEX `RideRequest_createdAt_idx`(`createdAt`),
    INDEX `RideRequest_assignedDriverId_idx`(`assignedDriverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriverLocation` ADD CONSTRAINT `DriverLocation_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RideRequest` ADD CONSTRAINT `RideRequest_passengerId_fkey` FOREIGN KEY (`passengerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RideRequest` ADD CONSTRAINT `RideRequest_assignedDriverId_fkey` FOREIGN KEY (`assignedDriverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
