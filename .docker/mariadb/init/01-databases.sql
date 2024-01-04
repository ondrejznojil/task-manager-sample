# create databases
CREATE DATABASE IF NOT EXISTS `task_manager`;
CREATE DATABASE IF NOT EXISTS `task_manager_test`;

# create root user and grant rights
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'local';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
