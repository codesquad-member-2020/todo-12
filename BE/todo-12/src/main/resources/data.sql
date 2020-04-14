insert into kanban(id) values (1);

insert into category(name, deleted, kanban, kanban_key) values ('Todo', false, 1, 0);
insert into category(name, deleted, kanban, kanban_key) values ('InProgress', false, 1, 1);
insert into category(name, deleted, kanban, kanban_key) values ('Done', false, 1, 2);

insert into card(title, content, author, deleted, category, category_key) values ('1번제목', '1번내용', '1번저자', false, 2, 0);
insert into card(title, content, author, deleted, category, category_key) values ('2번제목', '2번내용', '2번저자', false, 2, 1);
insert into card(title, content, author, deleted, category, category_key) values ('3번제목', '3번내용', '3번저자', false, 2, 2);
insert into card(title, content, author, deleted, category, category_key) values ('4번제목', '4번내용', '4번저자', false, 2, 3);

insert into card(title, content, author, deleted, category, category_key) values ('5번제목', '5번내용', '5번저자', false, 3, 0);
insert into card(title, content, author, deleted, category, category_key) values ('6번제목', '6번내용', '6번저자', false, 3, 1);
insert into card(title, content, author, deleted, category, category_key) values ('7번제목', '7번내용', '7번저자', false, 3, 0);

insert into card(title, content, author, deleted, category, category_key) values ('11번제목', '11번내용', '11번저자', false, 1, 0);
insert into card(title, content, author, deleted, category, category_key) values ('22번제목', '22번내용', '22번저자', false, 1, 1);

insert into user(user_id, password) values ('xp', 'xp');
insert into user(user_id, password) values ('henry', 'henry');
insert into user(user_id, password) values ('ellin', 'ellin');
insert into user(user_id, password) values ('olaf', 'olaf');