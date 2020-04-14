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
  name varchar(64) not null,
  deleted boolean,
  kanban int references kanban(id),
  kanban_key int
);

CREATE TABLE card  (
  id int primary key auto_increment,
  title varchar (64),
  content varchar (128),
  author varchar (64),
  modified_time datetime,
  category int references category(id),
  category_key int
);

--on delete cascade on update cascade

CREATE TABLE history  (
  id int primary key auto_increment,
  user_id varchar (64),
  action varchar (64) not null,
  title varchar (64),
  from_category varchar (64),
  to_category varchar (64)
);

CREATE TABLE user  (
  id int primary key auto_increment,
  user_id varchar (64) not null,
  password varchar (64) not null
);
