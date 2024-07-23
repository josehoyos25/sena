-- CreateTable
CREATE TABLE `Actividades` (
    `id_actividad` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(200) NULL,
    `fecha` DATE NULL,
    `evidencia` VARCHAR(100) NULL,
    `instructor` VARCHAR(50) NULL,
    `productiva` INTEGER NULL,

    INDEX `Actividades_productiva_idx`(`productiva`),
    PRIMARY KEY (`id_actividad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ambientes` (
    `id_ambiente` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_amb` VARCHAR(80) NULL,
    `municipio` INTEGER NULL,
    `sede` ENUM('centro', 'yamboro') NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado', 'activo', 'inactivo', 'lectiva', 'electiva', 'finalizado') NULL,

    INDEX `Ambientes_municipio_idx`(`municipio`),
    PRIMARY KEY (`id_ambiente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Areas` (
    `id_area` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_area` VARCHAR(80) NULL,

    PRIMARY KEY (`id_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asignaciones` (
    `id_asignacion` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATE NULL,
    `fecha_fin` DATE NULL,
    `productiva` INTEGER NULL,
    `instructor` INTEGER NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado', 'activo', 'inactivo', 'lectiva', 'electiva', 'finalizado') NULL,

    INDEX `Asignaciones_productiva_idx`(`productiva`),
    INDEX `Asignaciones_instructor_idx`(`instructor`),
    PRIMARY KEY (`id_asignacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `razon_social` VARCHAR(80) NULL,
    `direccion` VARCHAR(80) NULL,
    `telefono` VARCHAR(20) NULL,
    `correo` VARCHAR(80) NULL,
    `municipio` INTEGER NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado', 'activo', 'inactivo', 'lectiva', 'electiva', 'finalizado') NULL,

    INDEX `Empresa_municipio_idx`(`municipio`),
    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fichas` (
    `codigo` INTEGER NOT NULL,
    `inicio_ficha` DATE NULL,
    `fin_lectiva` DATE NULL,
    `fin_ficha` DATE NULL,
    `programa` INTEGER NULL,
    `sede` ENUM('centro', 'yamboro') NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado', 'activo', 'inactivo', 'lectiva', 'electiva', 'finalizado') NULL,

    INDEX `Fichas_programa_idx`(`programa`),
    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horarios` (
    `id_horario` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATE NULL,
    `hora_inicio` TIME NULL,
    `fecha_fin` DATE NULL,
    `hora_fin` TIME NULL,
    `dia` ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo') NULL,
    `cantidad_horas` INTEGER NULL,
    `instructor` INTEGER NULL,
    `ficha` INTEGER NULL,
    `ambiente` INTEGER NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado', 'activo', 'inactivo', 'lectiva', 'electiva', 'finalizado') NULL,

    INDEX `Horarios_ambiente_idx`(`ambiente`),
    INDEX `Horarios_ficha_idx`(`ficha`),
    INDEX `Horarios_instructor_idx`(`instructor`),
    PRIMARY KEY (`id_horario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matriculas` (
    `id_matricula` INTEGER NOT NULL AUTO_INCREMENT,
    `ficha` INTEGER NULL,
    `aprendiz` INTEGER NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado', 'activo', 'inactivo', 'lectiva', 'electiva', 'finalizado') NULL,
    `pendiente_tecnicos` INTEGER NULL,
    `pendiente_transversales` INTEGER NULL,
    `pendiente_ingles` INTEGER NULL,

    INDEX `Matriculas_aprendiz_idx`(`aprendiz`),
    UNIQUE INDEX `Matriculas_ficha_aprendiz_key`(`ficha`, `aprendiz`),
    PRIMARY KEY (`id_matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipios` (
    `id_municipio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_mpio` VARCHAR(80) NULL,
    `departamento` VARCHAR(80) NULL,

    PRIMARY KEY (`id_municipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Personas` (
    `id_persona` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` INTEGER NULL,
    `nombres` VARCHAR(80) NULL,
    `correo` VARCHAR(80) NULL,
    `telefono` VARCHAR(40) NULL,
    `password` VARCHAR(25) NULL,
    `rol` ENUM('Administrador', 'Instructor', 'Coordinador', 'Lider', 'Seguimiento') NULL,
    `cargo` ENUM('Instructor', 'Aprendiz', 'Coordinador', 'Administrativo') NULL,
    `municipio` INTEGER NULL,

    INDEX `Personas_municipio_idx`(`municipio`),
    UNIQUE INDEX `Personas_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id_persona`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productiva` (
    `id_productiva` INTEGER NOT NULL AUTO_INCREMENT,
    `matricula` INTEGER NULL,
    `empresa` INTEGER NULL,
    `fecha_inicio` DATE NULL,
    `fecha_fin` DATE NULL,
    `alternativa` ENUM('Contrato_de_Aprendizaje', 'Proyecto_Productivo', 'Pasantias', 'Monitoria') NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado', 'activo', 'inactivo', 'lectiva', 'electiva', 'finalizado') NULL,
    `acuerdo` VARCHAR(100) NULL,
    `arl` VARCHAR(100) NULL,
    `consulta` VARCHAR(100) NULL,

    INDEX `Productiva_matricula_idx`(`matricula`),
    INDEX `Productiva_empresa_idx`(`empresa`),
    PRIMARY KEY (`id_productiva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Programas` (
    `id_programa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_programa` VARCHAR(80) NULL,
    `sigla` VARCHAR(20) NULL,
    `nivel` ENUM('Tecnico', 'Tecnologo') NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado', 'activo', 'inactivo', 'lectiva', 'electiva', 'finalizado') NULL,

    PRIMARY KEY (`id_programa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seguimientos` (
    `id_seguimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NULL,
    `seguimiento` ENUM('seguimiento_1', 'seguimiento_2', 'seguimiento_3') NULL,
    `productiva` INTEGER NULL,
    `estado` ENUM('solicitud', 'aprobado', 'no_aprobado', 'activo', 'inactivo', 'lectiva', 'electiva', 'finalizado') NULL,
    `archivo` VARCHAR(100) NULL,
    `instructor` VARCHAR(50) NULL,

    INDEX `Seguimientos_productiva_idx`(`productiva`),
    PRIMARY KEY (`id_seguimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vinculacion` (
    `id_vinculacion` INTEGER NOT NULL AUTO_INCREMENT,
    `instructor` INTEGER NULL,
    `tipo` ENUM('contratista', 'planta') NULL,
    `sede` ENUM('centro', 'yamboro') NULL,
    `area` INTEGER NULL,

    INDEX `Vinculacion_instructor_idx`(`instructor`),
    INDEX `Vinculacion_area_idx`(`area`),
    PRIMARY KEY (`id_vinculacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
