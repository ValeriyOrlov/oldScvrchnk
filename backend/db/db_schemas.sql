CREATE TABLE users(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  is_activated boolean,
  activation_link varchar
);

CREATE TABLE tokens(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id bigint REFERENCES users (id),
  refresh_token text NOT NULL
);