DROP DATABASE IF EXISTS `cadastrodb`;
CREATE DATABASE IF NOT EXISTS `cadastrodb`;

USE `cadastrodb`;

CREATE TABLE IF NOT EXISTS `task` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(255) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT FALSE,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME
);

CREATE TABLE `user` (
	`id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
   	`name` VARCHAR(50) NOT NULL,
	`username` VARCHAR(255) NOT NULL UNIQUE,
	`birthDate` DATE,
	`password` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`sex` ENUM('Masculino', 'Feminino', 'Outro', 'Prefiro não responder'),	
	`status` ENUM('Ativo', 'Inativo', 'Pendente', 'Broqueado'),
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
   	`updatedAt` DATETIME
);

CREATE TABLE `cliente` (
	`id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
   	`name` VARCHAR(255) NOT NULL,
	`username` VARCHAR(255) NOT NULL UNIQUE,
	`birthDate` DATE,
	`email` VARCHAR(255) NOT NULL,
	`sex` ENUM('Masculino', 'Feminino', 'Outro', 'Prefiro não responder'),	
	`status` ENUM('Ativo', 'Inativo', 'Pendente', 'Broqueado'),
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
   	`updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE  `produto` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`nome` VARCHAR(255) NOT NULL,
	`codigo` VARCHAR(100) UNIQUE NOT NULL,
	`categoria` VARCHAR(255) NOT NULL,
	`preco` DECIMAL(10, 2) NOT NULL,
	`quantidade` INT UNSIGNED NOT NULL,
    status ENUM('ativo', 'inativo') NOT NULL,
	`descricao` TEXT,
	`criadoEm` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`atualizadoEm` DATETIME
);

SELECT * FROM `user`;
SELECT * FROM `produto`;
SELECT * FROM `cliente`;

INSERT INTO `user` (`name`, `username`, `birthDate`, `password`, `email`, `sex`, `status`, `createdAt`) VALUES
    ('admin', 'admin', '1990-05-15', '$2b$10$9XMuPNK2icx12i1GDEZeuejzWpUCs2NLVgc2zDNcire1CfOdqxzQ2', 'admin@hotmail.com', 'Masculino', 'Ativado', '0000-00-00');