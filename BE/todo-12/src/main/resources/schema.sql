DROP TABLE IF EXISTS category;

CREATE TABLE category  (
  id int primary key auto_increment,
  name varchar(32) not null
);

CREATE TABLE card  (
  id int primary key auto_increment,
  content varchar(32),
  category int references category(id)
);
