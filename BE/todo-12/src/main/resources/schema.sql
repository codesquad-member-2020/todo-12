DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS user;

CREATE TABLE category  (
  id int primary key auto_increment,
  name varchar(32) not null,
  cards_count int,
  valid boolean
);

CREATE TABLE card  (
  id int primary key auto_increment,
  title varchar (32),
  content varchar (32),
  author varchar (32),
  create_time datetime,
  modified_time datetime,
  deleted boolean,
  category int references category(id),
  category_key int
);

--on delete cascade on update cascade

CREATE TABLE history  (
  id int primary key auto_increment,
  user_id varchar (32),
  action varchar (32) not null,
  title varchar (32),
  from_category varchar (32),
  to_category varchar (32)
);

CREATE TABLE user  (
  id int primary key auto_increment,
  user_id varchar (32) not null,
  password varchar (32) not null
);
