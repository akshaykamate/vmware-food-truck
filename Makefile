build:
	docker-compose build

run:
	docker-compose up

db-init:
	cat database_dump.sql | docker exec -i pg psql -U postgres
