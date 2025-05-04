#!/usr/bin/env bash
psql "postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST/$POSTGRES_DB?sslmode=disable" <<-EOSQL
GRANT ALL PRIVILEGES ON DATABASE magic_db TO postgres


CREATE TABLE public.magic_movie_users (
    userid bigint NOT NULL,
    insertdate timestamp WITHOUT time zone DEFAULT CURRENT_TIMESTAMP,
    username text,
    firstname text,
    lastname text,
    dateofbirth text 
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
EOSQL