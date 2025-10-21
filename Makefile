# Variables de entorno
include .env

# Definiciones de comandos
start:
	docker-compose up -d

stop:
	docker-compose down

restart: stop start

logs-api:
	docker logs -f $(CONTAINER_PREFIX)_api

logs-frontend:
	docker logs -f $(CONTAINER_PREFIX)_frontend

logs-db:
	docker logs -f $(CONTAINER_PREFIX)_db

logs-media:
	docker logs -f $(CONTAINER_PREFIX)_media

logs-admin:
	docker logs -f $(CONTAINER_PREFIX)_admin

enter-api:
	docker exec -it $(CONTAINER_PREFIX)_api sh

enter-frontend:
	docker exec -it $(CONTAINER_PREFIX)_frontend bash

enter-db:
	docker exec -it $(CONTAINER_PREFIX)_db bash

enter-media:
	docker exec -it $(CONTAINER_PREFIX)_media bash

enter-admin:
	docker exec -it $(CONTAINER_PREFIX)_admin bash

build-frontend:
	docker-compose run --rm frontend yarn build

artisan-optimize:
	docker exec -it $(CONTAINER_PREFIX)_admin php artisan optimize

artisan-migrate:
	docker exec -it $(CONTAINER_PREFIX)_admin php artisan migrate

artisan-seed:
	docker exec -it $(CONTAINER_PREFIX)_admin php artisan db:seed

dps:
	docker-compose ps -a

dres:
	docker-compose restart

install-front:
	docker-compose run $(CONTAINER_PREFIX)_frontend sh

clean:
	docker builder prune -f

enter-frontend:
	docker-compose run frontend bash

	
.PHONY: start stop restart logs-api logs-frontend logs-db logs-media logs-admin enter-api enter-frontend enter-db enter-media enter-admin build-frontend artisan-optimize