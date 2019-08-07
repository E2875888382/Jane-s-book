/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 8.0.15 : Database - videos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`videos` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `videos`;

/*Table structure for table `developer` */

DROP TABLE IF EXISTS `developer`;

CREATE TABLE `developer` (
  `name` char(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '姓名',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '外号',
  `nickname` char(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '宿舍昵称',
  `bed` char(10) DEFAULT NULL COMMENT '床号',
  `gameName` char(40) DEFAULT NULL COMMENT '英雄联盟id',
  `status` char(10) DEFAULT NULL COMMENT '宿舍地位',
  `reason` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '无' COMMENT '外号由来',
  `hobby` varchar(80) DEFAULT NULL COMMENT '爱好',
  `native` char(10) DEFAULT NULL COMMENT '籍贯',
  `career` varchar(50) DEFAULT NULL COMMENT '毕业去向',
  `class` char(20) DEFAULT NULL COMMENT '班级',
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `friend` */

DROP TABLE IF EXISTS `friend`;

CREATE TABLE `friend` (
  `userID` int(5) unsigned zerofill NOT NULL COMMENT 'userID',
  `friendID` int(5) unsigned zerofill NOT NULL COMMENT '好友ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `messageID` int(11) NOT NULL AUTO_INCREMENT COMMENT '消息序列',
  `userID` int(5) unsigned zerofill NOT NULL,
  `receiverID` int(5) unsigned zerofill NOT NULL,
  `content` varchar(100) DEFAULT NULL COMMENT '消息内容',
  `time` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '发送时间',
  `isRead` tinyint(1) DEFAULT '0' COMMENT '消息是否已读',
  KEY `messageID` (`messageID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Table structure for table `news` */

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `newID` int(11) NOT NULL AUTO_INCREMENT COMMENT '新闻的编号',
  `title` varchar(40) NOT NULL COMMENT '新闻标题',
  `time` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '2019-07-03' COMMENT '发布时间',
  `view` int(11) DEFAULT '0' COMMENT '阅读量',
  `abstract` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '新闻摘要',
  `img` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '缩略图地址',
  `source` varchar(20) NOT NULL DEFAULT 'Twitter' COMMENT '新闻来源',
  `content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '新闻详情',
  KEY `id` (`newID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Table structure for table `photo` */

DROP TABLE IF EXISTS `photo`;

CREATE TABLE `photo` (
  `photoID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userID` int(5) unsigned zerofill DEFAULT NULL,
  `tags` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '标签',
  `src` mediumtext COMMENT '封面',
  `title` char(100) DEFAULT NULL COMMENT '标题',
  `praise` int(11) DEFAULT '0' COMMENT '点赞数',
  `view` int(11) DEFAULT '0' COMMENT '浏览数',
  `time` char(100) DEFAULT NULL COMMENT '发布时间',
  `photo` mediumtext,
  KEY `id` (`photoID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

/*Table structure for table `photocollection` */

DROP TABLE IF EXISTS `photocollection`;

CREATE TABLE `photocollection` (
  `userID` int(5) unsigned zerofill DEFAULT NULL,
  `photoID` int(11) DEFAULT NULL,
  `time` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `photoreply` */

DROP TABLE IF EXISTS `photoreply`;

CREATE TABLE `photoreply` (
  `photoReplyID` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论序列',
  `photoID` int(11) DEFAULT NULL COMMENT '评论对应的相册序列号',
  `userID` int(5) unsigned zerofill DEFAULT NULL COMMENT '用户',
  `time` varchar(100) DEFAULT NULL COMMENT '发布时间',
  `content` varchar(300) DEFAULT NULL COMMENT '内容',
  `praise` int(11) DEFAULT '0' COMMENT '点赞数',
  `down` int(11) DEFAULT '0' COMMENT '踩数',
  KEY `id` (`photoID`),
  KEY `photoReplyID` (`photoReplyID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

/*Table structure for table `street` */

DROP TABLE IF EXISTS `street`;

CREATE TABLE `street` (
  `streetID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序列号',
  `userID` int(5) unsigned zerofill DEFAULT NULL,
  `topic` varchar(100) DEFAULT NULL COMMENT '主题',
  `time` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '发布时间',
  `view` int(11) DEFAULT '0' COMMENT '浏览数',
  `replyCount` int(11) DEFAULT '0' COMMENT '回复数',
  `content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '正文',
  `img` mediumtext COMMENT '配图',
  KEY `id` (`streetID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

/*Table structure for table `streetcollection` */

DROP TABLE IF EXISTS `streetcollection`;

CREATE TABLE `streetcollection` (
  `userID` int(5) unsigned zerofill DEFAULT NULL,
  `streetID` int(11) DEFAULT NULL,
  `time` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `streetreply` */

DROP TABLE IF EXISTS `streetreply`;

CREATE TABLE `streetreply` (
  `streetReplyID` int(11) NOT NULL AUTO_INCREMENT,
  `streetID` int(11) DEFAULT NULL COMMENT '回复的帖子的id',
  `userID` int(5) unsigned zerofill DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL COMMENT '回复时间',
  `praise` int(11) DEFAULT '0' COMMENT '被点亮数目',
  `content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '正文',
  KEY `streetReplyID` (`streetReplyID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userID` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '全局user标记',
  `email` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '邮箱',
  `password` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '昵称',
  `qq` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '绑定的qq号',
  `telephone` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '手机',
  `birthday` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '出生日期',
  `level` int(100) unsigned DEFAULT '0' COMMENT '用户等级',
  `gender` char(4) DEFAULT NULL COMMENT '性别',
  `sign` varchar(100) DEFAULT NULL COMMENT '签名',
  `avatar` mediumtext COMMENT '头像',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
