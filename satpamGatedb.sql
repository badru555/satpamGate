/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 10.1.37-MariaDB : Database - mylife
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mylife` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `mylife`;

/*Table structure for table `datamasuk` */

DROP TABLE IF EXISTS `datamasuk`;

CREATE TABLE `datamasuk` (
  `nim` decimal(20,0) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `prodi` varchar(100) DEFAULT NULL,
  `DTKeluar` datetime DEFAULT NULL,
  `DTMasuk` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `datamasuk` */

insert  into `datamasuk`(`nim`,`nama`,`prodi`,`DTKeluar`,`DTMasuk`) values 
(372016611515,'Hisnu Al-Muajahidin','Teknik Informatika','2018-11-13 17:21:47','2018-11-16 17:22:42'),
(372016611515,'Hisnu Al-Muajahidin','Teknik Informatika','2018-11-16 21:03:47','2018-11-16 21:04:04'),
(372016611502,'Badrus Sholeh','Teknik Informatika','2019-05-10 09:51:43','2019-05-10 09:52:48');

/*Table structure for table `keluar` */

DROP TABLE IF EXISTS `keluar`;

CREATE TABLE `keluar` (
  `nim` decimal(20,0) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `prodi` varchar(100) DEFAULT NULL,
  `DTKeluar` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nim`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `keluar` */

/*Table structure for table `log` */

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `nim` decimal(20,0) DEFAULT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `aktivitas` varchar(50) DEFAULT NULL,
  `waktu` datetime DEFAULT CURRENT_TIMESTAMP,
  `keterangan` varchar(50) DEFAULT '-'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `log` */

insert  into `log`(`nim`,`nama`,`aktivitas`,`waktu`,`keterangan`) values 
(372016611515,'Hisnu Al-Muajahidin','keluar kampus','2018-11-16 17:21:47','-'),
(372016611515,'Hisnu Al-Muajahidin','masuk kampus','2018-11-16 17:22:45','3 overday'),
(372016611503,'Elsa Septiani','keluar kampus','2018-11-16 20:59:47','-'),
(372016611515,'Hisnu Al-Muajahidin','keluar kampus','2018-11-16 21:03:47','-'),
(372016611502,'Badrus Sholeh','keluar kampus','2019-05-10 09:51:43','-');

/*Table structure for table `mahasiswa` */

DROP TABLE IF EXISTS `mahasiswa`;

CREATE TABLE `mahasiswa` (
  `nim` decimal(20,0) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `prodi` varchar(50) DEFAULT NULL,
  `filefoto` varchar(50) DEFAULT 'user.png',
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`nim`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `mahasiswa` */

insert  into `mahasiswa`(`nim`,`nama`,`prodi`,`filefoto`,`phone`) values 
(372016211143,'Rinaldi Permana','Studi Agama-Agama','user.png','081818181552'),
(372016611502,'Badrus Sholeh','Teknik Informatika','badrus.jpg','081552552552'),
(372016611503,'Elsa Septiani','Agroteknolgi','user.png','081818181553'),
(372016611515,'Hisnu Al-Muajahidin','Teknik Informatika','user.png','082228829680');

/*Table structure for table `telad_an` */

DROP TABLE IF EXISTS `telad_an`;

CREATE TABLE `telad_an` (
  `nim` decimal(20,0) DEFAULT NULL,
  `jenis` varchar(20) DEFAULT NULL,
  `waktu` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `telad_an` */

/* Trigger structure for table `keluar` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `log_keluar` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `log_keluar` BEFORE INSERT ON `keluar` FOR EACH ROW 
begin
insert into `log` set nim = new.nim, nama=new.nama, aktivitas='keluar kampus';
end */$$


DELIMITER ;

/* Trigger structure for table `keluar` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `datamasuk` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `datamasuk` BEFORE DELETE ON `keluar` FOR EACH ROW 
begin
insert into datamasuk set nim = old.nim, nama=old.nama, prodi=old.prodi, DTKeluar=old.DTKeluar, DTMasuk=now();
end */$$


DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
