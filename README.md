# Time_manager_API

## Readme for the: DevOps branch

To-do: traduire en anglais.

Ce readme explique comment fonctionne la partie conteneurs de notre projet.

Pour l'instant nous avons 3 conteneurs: *back*, *front* et *bdd*:
  - back est notre API nodejs exposée sur le port 3000.
  - front est notre front-end en Vue.js exposé sur le port 8080.
  - bdd est notre base de données Postgresql.

Ces 3 conteneurs sont définis dans [le docker compose](./docker-compose.yml).