DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS user;

CREATE TABLE category  (
  id int primary key auto_increment,
  name varchar(64),
  deleted boolean
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
  card_title varchar (64),
  card_content varchar (512),
  from_category varchar (64),
  to_category varchar (64),
  modified_time datetime
);

CREATE TABLE user  (
  id int primary key auto_increment,
  user_id varchar (32) not null,
  password varchar (32) not null
);
