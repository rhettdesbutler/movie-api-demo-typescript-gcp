--CREATE DATABASE IF NOT EXISTS magic_db
GRANT ALL PRIVILEGES ON DATABASE magic_db TO postgres


CREATE TABLE public.magic_movie_users (
    userid bigint NOT NULL,
    insertdate timestamp WITHOUT time zone DEFAULT CURRENT_TIMESTAMP,
    username text,
    firstname text,
    lastname text,
    dateofbirth text,
    email text
);

CREATE TABLE public.magic_movie_catalogue (
    id bigint NOT NULL,
    insertdate timestamp WITHOUT time zone DEFAULT CURRENT_TIMESTAMP,
    updatedate timestamp WITHOUT time zone DEFAULT CURRENT_TIMESTAMP,
    title text,
    year text,
    genre text,
    rating integer
);

INSERT INTO magic_movie_users (userid, username, firstname, lastname, dateofbirth, email)
VALUES 
(00001, 'theknow12', 'bobby', 'smith', '15-04-1997', 'bobbysmith@mail.com'),
(00002, 'sereneunimpressively', 'sara', 'jones', '15-04-1997', 'sarajones@mail.com'),
(00003, 'serene&GqzYRp7', 'gene', 'charles', '15-04-1997', 'genecharles@mail.com'),
(00004, 'BoomAdsfg', 'shane', 'heely', '15-04-1997', 'shaenheely@mail.com'),
(00005, 'GypsyHello', 'henry', 'mcbride', '15-04-1997', 'henrymcbride@mail.com'),
(00006, 'NostalgicBye', 'isa', 'svensson', '15-04-1997', 'isasvensson@mail.com'),
(00007, 'GriffinComp', 'ragnar', 'hansson', '15-04-1997', 'ragnarhansson@mail.com'),
(00008, 'RestlessComp', 'gale', 'king', '15-04-1997', 'galeking@mail.com'),
(00009, 'GaiaHithere', 'john', 'jones', '15-04-1997', 'johnjones@mail.com'),
(00010, 'NimbleHithere', 'dave', 'smith', '15-04-1997', 'davesmith@mail.com'),
(00011, 'OrnateAdsfg', 'joe', 'biden', '15-04-1997', 'joebiden@mail.com'),