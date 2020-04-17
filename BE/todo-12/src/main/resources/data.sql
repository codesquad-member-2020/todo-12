insert into category(name, deleted) values ('Todo', false);
insert into category(name, deleted) values ('InProgress', false);
insert into category(name, deleted) values ('Done', false);

insert into card(title, content, author, category, category_key) values ('1번제목', '1번내용', '1번저자', 1, 0);
insert into card(title, content, author, category, category_key) values ('2번제목', '2번내용', '2번저자', 1, 1);
insert into card(title, content, author, category, category_key) values ('3번제목', '3번내용', '3번저자', 1, 2);
insert into card(title, content, author, category, category_key) values ('4번제목', '4번내용', '4번저자', 1, 3);

insert into card(title, content, author, category, category_key) values ('5번제목', '5번내용', '5번저자', 2, 0);
insert into card(title, content, author, category, category_key) values ('6번제목', '6번내용', '6번저자', 2, 1);
insert into card(title, content, author, category, category_key) values ('7번제목', '7번내용', '7번저자', 2, 2);

insert into card(title, content, author, category, category_key) values ('8번제목', '8번내용', '8번저자', 3, 0);
insert into card(title, content, author, category, category_key) values ('9번제목', '9번내용', '9번저자', 3, 1);

insert into user(userId, password) values ('todo12', 'todo12');