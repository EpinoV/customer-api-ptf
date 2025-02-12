-- Insertar Usuarios base si no existen
INSERT INTO "USERS" ("USER_NAME", "EMAIL", "PASSWORD", "ROLE", "IS_ACTIVE") VALUES ('admin', 'admin@test.cl', '$2a$10$5sZcL9l77RpREwiPFncpbupkbRmqPbWeH.V9erQll7xd0rFkC6OjG', 'ADMIN', true) ON CONFLICT ("USER_NAME") DO NOTHING;
INSERT INTO "USERS" ("USER_NAME", "EMAIL", "PASSWORD", "ROLE", "IS_ACTIVE") VALUES ('user', 'user@test.cl', '$2a$10$5sZcL9l77RpREwiPFncpbupkbRmqPbWeH.V9erQll7xd0rFkC6OjG', 'USER', true) ON CONFLICT ("USER_NAME") DO NOTHING;

-- Insertar ciudades si no existen
INSERT INTO "CITY" ("CITY_NAME") VALUES ('New York') ON CONFLICT ("CITY_NAME") DO NOTHING;
INSERT INTO "CITY" ("CITY_NAME") VALUES ('Los Angeles') ON CONFLICT ("CITY_NAME") DO NOTHING;
INSERT INTO "CITY" ("CITY_NAME") VALUES ('Chicago') ON CONFLICT ("CITY_NAME") DO NOTHING;

-- Insertar vendedores si no existen
INSERT INTO "SELLER" ("SELLER_NAME", "SELLER_EMAIL", "SELLER_PHONE_NUMBER", "SELLER_ADDRESS") VALUES ('Juan Pérez', 'jp@seller.cl', '+56988889999', 'Evergreen 1234') ON CONFLICT ("SELLER_NAME") DO NOTHING;
INSERT INTO "SELLER" ("SELLER_NAME", "SELLER_EMAIL", "SELLER_PHONE_NUMBER", "SELLER_ADDRESS") VALUES ('María López', 'ml@seller.cl', '+56988889999', 'Evergreen 1234') ON CONFLICT ("SELLER_NAME") DO NOTHING;
INSERT INTO "SELLER" ("SELLER_NAME", "SELLER_EMAIL", "SELLER_PHONE_NUMBER", "SELLER_ADDRESS") VALUES ('Carlos Gómez', 'cg@seller.cl', '+56988889999', 'Evergreen 1234') ON CONFLICT ("SELLER_NAME") DO NOTHING;
