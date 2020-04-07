DROP TABLE IF EXISTS category;

CREATE TABLE category  (
  id int primary key auto_increment,
  name varchar(32) not null,
  cards_count int,
  status boolean
);

CREATE TABLE card  (
  id int primary key auto_increment,
  title varchar (32),
  content varchar (32),
  author varchar (32),
  create_time datetime,
  modified_time datetime,
  category int references category(id),
  category_key int
);
