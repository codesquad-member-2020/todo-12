DROP TABLE IF EXISTS kanban;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS user;

CREATE TABLE kanban  (
  id int primary key auto_increment
);

CREATE TABLE category  (
  id int primary key auto_increment,
  name varchar(64),
  deleted boolean,
  kanban int references kanban(id),
  kanban_key int
);

CREATE TABLE card  (
  id int primary key auto_increment,
  title varchar (64),
  content varchar (512),
  author varchar (32),
  modified_time datetime,
  category int references category(id),
  category_key int
);

CREATE TABLE history  (
  id int primary key auto_increment,
  user_id varchar (32),
  action varchar (32),
  title varchar (64),
  from_category varchar (64),
  to_category varchar (64)
);

CREATE TABLE user  (
  id int primary key auto_increment,
  user_id varchar (32) not null,
  password varchar (32) not null
);
