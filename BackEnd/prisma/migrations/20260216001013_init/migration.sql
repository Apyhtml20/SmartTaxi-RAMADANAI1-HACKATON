-- DropIndex
DROP INDEX `RideRequest_passengerId_fkey` ON `riderequest`;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriverLocation` ADD CONSTRAINT `DriverLocation_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RideRequest` ADD CONSTRAINT `RideRequest_passengerId_fkey` FOREIGN KEY (`passengerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RideRequest` ADD CONSTRAINT `RideRequest_assignedDriverId_fkey` FOREIGN KEY (`assignedDriverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
