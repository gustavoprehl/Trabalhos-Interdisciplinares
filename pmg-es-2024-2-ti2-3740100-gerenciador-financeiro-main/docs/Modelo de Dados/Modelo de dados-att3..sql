-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Usuario` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `UsuarioID` VARCHAR(36) NOT NULL,
  `Nome` VARCHAR(100) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `Senha` VARCHAR(100) NOT NULL,
  `TipoUsuario` VARCHAR(100) NOT NULL,
  `NotificacoesLidas` TINYINT NULL,
  PRIMARY KEY (`UsuarioID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`CategoriaPote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CategoriaPote` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`CategoriaPote` (
  `CategoriaPoteID` VARCHAR(36) NOT NULL,
  `Nome` VARCHAR(50) NOT NULL,
  `Descricao` TEXT NOT NULL,
  PRIMARY KEY (`CategoriaPoteID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`StatusPote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`StatusPote` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`StatusPote` (
  `StatusPoteID` VARCHAR(36) NOT NULL,
  `StatusNome` VARCHAR(50) NOT NULL,
  `StatusDescricao` VARCHAR(225) NOT NULL,
  `Ativo` TINYINT NOT NULL,
  PRIMARY KEY (`StatusPoteID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`PoteFinanceiro`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`PoteFinanceiro` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`PoteFinanceiro` (
  `PoteFinanceiroID` VARCHAR(36) NOT NULL,
  `NomePote` VARCHAR(50) NOT NULL,
  `ValorInicial` DECIMAL(10,2) NULL,
  `ValorFinal` DECIMAL(5,2) NOT NULL,
  `DataLimite` DATETIME NOT NULL,
  `DataCriacao` DATETIME NOT NULL,
  `DataAtualizacao` DATETIME NOT NULL,
  `DataConclusão` DATETIME NOT NULL,
  `Usuario_UsuarioID` VARCHAR(36) NOT NULL,
  `CategoriaPote_CategoriaPoteID` VARCHAR(36) NOT NULL,
  `StatusPote_StatusPoteID` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`PoteFinanceiroID`, `Usuario_UsuarioID`, `CategoriaPote_CategoriaPoteID`, `StatusPote_StatusPoteID`),
  CONSTRAINT `fk_PoteFinanceiroID_Usuario`
    FOREIGN KEY (`Usuario_UsuarioID`)
    REFERENCES `mydb`.`Usuario` (`UsuarioID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PoteFinanceiroID_CategoriaPote1`
    FOREIGN KEY (`CategoriaPote_CategoriaPoteID`)
    REFERENCES `mydb`.`CategoriaPote` (`CategoriaPoteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PoteFinanceiroID_StatusPote1`
    FOREIGN KEY (`StatusPote_StatusPoteID`)
    REFERENCES `mydb`.`StatusPote` (`StatusPoteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_PoteFinanceiroID_Usuario_idx` ON `mydb`.`PoteFinanceiro` (`Usuario_UsuarioID` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_PoteFinanceiroID_CategoriaPote1_idx` ON `mydb`.`PoteFinanceiro` (`CategoriaPote_CategoriaPoteID` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_PoteFinanceiroID_StatusPote1_idx` ON `mydb`.`PoteFinanceiro` (`StatusPote_StatusPoteID` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`TipoTransacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`TipoTransacao` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`TipoTransacao` (
  `TipoTransacaoID` VARCHAR(36) NOT NULL,
  `Nome` VARCHAR(50) NOT NULL,
  `Descricao` TEXT NOT NULL,
  `ExigeAprovacao` TINYINT NOT NULL,
  PRIMARY KEY (`TipoTransacaoID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Transacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Transacao` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Transacao` (
  `TransacaoID` VARCHAR(36) CHARACTER SET 'big5' NOT NULL,
  `Valor` DECIMAL(10,2) NULL,
  `DataTransacao` DATETIME NOT NULL,
  `Categoria` ENUM('Alimentacao', 'Transporte', 'Saude', 'Moradia', 'Lazer', 'Poupanca', 'Outros') NOT NULL,
  `Descricão` TEXT NULL,
  `DataCriacao` DATETIME NOT NULL,
  `DataAtualizacao` DATETIME NOT NULL,
  `PoteFinanceiro_PoteFinanceiroID` VARCHAR(36) NOT NULL,
  `TipoTransacao_TipoTransacaoID` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`TransacaoID`, `PoteFinanceiro_PoteFinanceiroID`, `TipoTransacao_TipoTransacaoID`),
  CONSTRAINT `fk_Transacao_PoteFinanceiroID1`
    FOREIGN KEY (`PoteFinanceiro_PoteFinanceiroID`)
    REFERENCES `mydb`.`PoteFinanceiro` (`PoteFinanceiroID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transacao_TipoTransacao1`
    FOREIGN KEY (`TipoTransacao_TipoTransacaoID`)
    REFERENCES `mydb`.`TipoTransacao` (`TipoTransacaoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_Transacao_PoteFinanceiroID1_idx` ON `mydb`.`Transacao` (`PoteFinanceiro_PoteFinanceiroID` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_Transacao_TipoTransacao1_idx` ON `mydb`.`Transacao` (`TipoTransacao_TipoTransacaoID` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`StatusMeta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`StatusMeta` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`StatusMeta` (
  `StatusMetaID` VARCHAR(36) NOT NULL,
  `Nome` VARCHAR(50) NOT NULL,
  `Descricao` VARCHAR(225) NOT NULL,
  `Ativo` TINYINT NOT NULL,
  PRIMARY KEY (`StatusMetaID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`CategoriaMeta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CategoriaMeta` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`CategoriaMeta` (
  `CategoriametaID` VARCHAR(36) NOT NULL,
  `Nome` VARCHAR(50) NOT NULL,
  `Descricao` TEXT NOT NULL,
  PRIMARY KEY (`CategoriametaID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Meta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Meta` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Meta` (
  `MetaID` VARCHAR(36) NOT NULL,
  `NomeMeta` VARCHAR(50) NOT NULL,
  `ValorAlvo` DECIMAL(10,2) NOT NULL,
  `DataLimite` DATETIME NOT NULL,
  `DescriçãoMeta` VARCHAR(100) NOT NULL,
  `TipoMeta` ENUM('Unica', 'Periodica') NOT NULL,
  `Usuario_UsuarioID` VARCHAR(36) NOT NULL,
  `StatusMeta_StatusMetaID` VARCHAR(36) NOT NULL,
  `PoteFinanceiro_PoteFinanceiroID` VARCHAR(36) NOT NULL,
  `CategoriaMeta_CategoriametaID` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`MetaID`, `Usuario_UsuarioID`, `StatusMeta_StatusMetaID`, `PoteFinanceiro_PoteFinanceiroID`, `CategoriaMeta_CategoriametaID`),
  CONSTRAINT `fk_Meta_Usuario1`
    FOREIGN KEY (`Usuario_UsuarioID`)
    REFERENCES `mydb`.`Usuario` (`UsuarioID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Meta_StatusMeta1`
    FOREIGN KEY (`StatusMeta_StatusMetaID`)
    REFERENCES `mydb`.`StatusMeta` (`StatusMetaID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Meta_PoteFinanceiroID1`
    FOREIGN KEY (`PoteFinanceiro_PoteFinanceiroID`)
    REFERENCES `mydb`.`PoteFinanceiro` (`PoteFinanceiroID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Meta_CategoriaMeta1`
    FOREIGN KEY (`CategoriaMeta_CategoriametaID`)
    REFERENCES `mydb`.`CategoriaMeta` (`CategoriametaID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_Meta_Usuario1_idx` ON `mydb`.`Meta` (`Usuario_UsuarioID` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_Meta_StatusMeta1_idx` ON `mydb`.`Meta` (`StatusMeta_StatusMetaID` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_Meta_PoteFinanceiroID1_idx` ON `mydb`.`Meta` (`PoteFinanceiro_PoteFinanceiroID` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_Meta_CategoriaMeta1_idx` ON `mydb`.`Meta` (`CategoriaMeta_CategoriametaID` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`HistoricoPote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`HistoricoPote` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`HistoricoPote` (
  `HistoricoPoteID` VARCHAR(36) NOT NULL,
  `StatusAnterior` ENUM('Ativo', 'Inativo', 'Concluido') NOT NULL,
  `StatusAtual` ENUM('Ativo', 'Inativo', 'Concluido') NOT NULL,
  `DataMudança` DATETIME NOT NULL,
  `TipoModificação` ENUM('MetaAtingida', 'DataLimiteAtingida', 'AlteracaoManual') NOT NULL,
  `PoteFinanceiro_PoteFinanceiroID` VARCHAR(36) NOT NULL,
  `Usuario_UsuarioID` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`HistoricoPoteID`, `PoteFinanceiro_PoteFinanceiroID`, `Usuario_UsuarioID`),
  CONSTRAINT `fk_HistoricoPote_PoteFinanceiroID1`
    FOREIGN KEY (`PoteFinanceiro_PoteFinanceiroID`)
    REFERENCES `mydb`.`PoteFinanceiro` (`PoteFinanceiroID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistoricoPote_Usuario1`
    FOREIGN KEY (`Usuario_UsuarioID`)
    REFERENCES `mydb`.`Usuario` (`UsuarioID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_HistoricoPote_PoteFinanceiroID1_idx` ON `mydb`.`HistoricoPote` (`PoteFinanceiro_PoteFinanceiroID` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_HistoricoPote_Usuario1_idx` ON `mydb`.`HistoricoPote` (`Usuario_UsuarioID` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`RelatorioProgresso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`RelatorioProgresso` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`RelatorioProgresso` (
  `RelatorioID` VARCHAR(36) NOT NULL,
  `DataGeracao` DATETIME NOT NULL,
  `ValorAtualDisponivel` DECIMAL NOT NULL,
  `PorcentagemMetaAtingida` DECIMAL NOT NULL,
  `QtdMetasAtingidas` INT NOT NULL,
  `HistoricoPote_HistoricoPoteID` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`RelatorioID`, `HistoricoPote_HistoricoPoteID`),
  CONSTRAINT `fk_RelatorioProgresso_HistoricoPote1`
    FOREIGN KEY (`HistoricoPote_HistoricoPoteID`)
    REFERENCES `mydb`.`HistoricoPote` (`HistoricoPoteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_RelatorioProgresso_HistoricoPote1_idx` ON `mydb`.`RelatorioProgresso` (`HistoricoPote_HistoricoPoteID` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`AlocacaoReceitas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`AlocacaoReceitas` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`AlocacaoReceitas` (
  `AlocacaoID` VARCHAR(36) NOT NULL,
  `ValorAlocado` DECIMAL(10,2) NOT NULL,
  `DataAlocacao` DATETIME NOT NULL,
  `Meta_MetaID` VARCHAR(36) NOT NULL,
  `Transacao_TransacaoID` VARCHAR(36) CHARACTER SET 'big5' NOT NULL,
  PRIMARY KEY (`AlocacaoID`, `Meta_MetaID`, `Transacao_TransacaoID`),
  CONSTRAINT `fk_AlocacaoReceitas_Meta1`
    FOREIGN KEY (`Meta_MetaID`)
    REFERENCES `mydb`.`Meta` (`MetaID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AlocacaoReceitas_Transacao1`
    FOREIGN KEY (`Transacao_TransacaoID`)
    REFERENCES `mydb`.`Transacao` (`TransacaoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_AlocacaoReceitas_Meta1_idx` ON `mydb`.`AlocacaoReceitas` (`Meta_MetaID` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_AlocacaoReceitas_Transacao1_idx` ON `mydb`.`AlocacaoReceitas` (`Transacao_TransacaoID` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`TipoNotificacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`TipoNotificacao` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`TipoNotificacao` (
  `TipoNotificacaoID` VARCHAR(36) NOT NULL,
  `Nome` VARCHAR(50) NOT NULL,
  `Descricao` VARCHAR(225) NOT NULL,
  `NivelUrgencia` ENUM('Baixo', 'Medio', 'Urgente') NOT NULL,
  PRIMARY KEY (`TipoNotificacaoID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Notificacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Notificacao` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `mydb`.`Notificacao` (
  `NotificacaoID` VARCHAR(36) NOT NULL,
  `Conteudo` VARCHAR(225) NOT NULL,
  `DataNotificacao` DATETIME NOT NULL,
  `StatusNotificacao` ENUM('Lida', 'NaoLida') NOT NULL,
  `TipoNotificacao_TipoNotificacaoID` VARCHAR(36) NOT NULL,
  `Transacao_TransacaoID` VARCHAR(36) CHARACTER SET 'big5' NOT NULL,
  PRIMARY KEY (`NotificacaoID`, `TipoNotificacao_TipoNotificacaoID`, `Transacao_TransacaoID`),
  CONSTRAINT `fk_Notificacao_TipoNotificacao1`
    FOREIGN KEY (`TipoNotificacao_TipoNotificacaoID`)
    REFERENCES `mydb`.`TipoNotificacao` (`TipoNotificacaoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Notificacao_Transacao1`
    FOREIGN KEY (`Transacao_TransacaoID`)
    REFERENCES `mydb`.`Transacao` (`TransacaoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_Notificacao_TipoNotificacao1_idx` ON `mydb`.`Notificacao` (`TipoNotificacao_TipoNotificacaoID` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_Notificacao_Transacao1_idx` ON `mydb`.`Notificacao` (`Transacao_TransacaoID` ASC) VISIBLE;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
