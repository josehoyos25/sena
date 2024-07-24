-- AlterTable
ALTER TABLE `ambientes` MODIFY `estado` ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo';
