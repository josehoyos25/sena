-- AlterTable
ALTER TABLE `horarios` MODIFY `estado` ENUM('solicitud', 'aprobado', 'noaprobado') NOT NULL DEFAULT 'aprobado';
