# [Time_manager](https://timepool.me)
[![Build Status](https://travis-ci.org/Arnoways/Time_Manager.svg?branch=prod)](https://travis-ci.org/Arnoways/Time_Manager)

## API Documentation
https://timepool.me:3001/api-docs

Ce readme explique comment fonctionne notre projet.

Nous avons 3 conteneurs principaux: *back*, *front* et *bdd*:
  - back est notre API nodejs exposée sur le port 3000.
  - front est notre front-end en Vue.js exposé sur le port 8080.
  - bdd est notre base de données Postgresql.

Ces 3 conteneurs sont définis dans [le docker compose](./docker-compose.yml).

## Arborescence:

```
├── docker-compose.yml
├── README.md
├── scripts               # useful scripts 
├── time_manager_api      # code backend
└── time_manager_front    # code frontend
```

Dans les deux dossiers de code sont définis des Dockerfile qui contiennent des
instructions sur comment construire les conteneurs spécifiquement pour nos applis.
Le Dockerfile Vue.js étant basé sur [cet exemple](https://fr.vuejs.org/v2/cookbook/dockerize-vuejs-app.html).

## Comment s'en servir?

Une fois cloné, il suffit d'aller dans le repo et de lancer les commandes suivantes:
```
docker-compose up -d bdd  # la bdd pouvant mettre plusieurs secondes à se lancer, on la démarre en premier pour éviter les erreurs sur le back.
docker-compose build      # va télécharger les images et constuire celles de nos conteneurs.
docker-compose up -d      # lance le reste de nos conteneurs.
```
Maintenant, notre front devrait être accessible sur http://localhost:8080 et le back sur http://localhost:3000

## J'ai modifié mon code, je fais quoi?

Les conteneurs front et back ont les dossiers de leurs codes montés en volume (cf docker-compose),
ce qui permet d'éviter de re-build les images à chaque modificaiton. Il faut cependant restart le conteneur
(`docker-compose restart back||front`) pour que les modifications soient prises en compte.

*note: il est aussi possible de changer la manière dont on exécute le code dans
 les entrypoint pour qu'il soit en mode interactif et donc pour que 
 les modifications soient prises en compte direcetement*

## J'ai rajouté une dépendance ou/et j'ai modifié le Dockerfile ou le docker-compose

Dans ce cas il faut reconstruire l'image et redémarrer le conteneur pour que 
les modifications soient prises en compte.

## Commandes utiles

```
docker-compose ps                         # affiche quels conteneurs sont up et leurs ports.
docker-compose ps -a                      # affiche tous les conteneurs et les codes de sorties de certains si sont down.

docker-compose logs back||front||bdd      # affiche tous les logs du conteneur choisit.
docker-compose logs -f back||front||bdd   # suit le log output du conteneur choisit.

docker-compose top                        # affiche les proccess en execution / conteneur.

docker-compose exec                       # permet d'executer une commande dans un conteneur.
docker-compose exec bdd bash              # rentre dans le conteneur bdd en executant bash.
```

## CI/CD
Pour faire fonctionner notre application nous avons une instance EC2 sur AWS.
Cependant, il peut être utile de vérifier que les changements de notre code ne
casse pas l'intégrité de notre application.  
Pour cela nous avons mis en place de la CI grâce à Jarvis qui va build automatiquement
nos images [ici](https://travis-ci.org/Arnoways/Time_Manager) et procéder à quelques tests simples afin de voir si certaines fonctionnalités 
sont toujours opérationnelles. Ce dernier va se déclencher à chaque push sur la ou les branches désignées.
Le fichier de configuration se trouve [ici](.travis.yml).

*note: arno.pem.enc est la clé nécessaire pour se connecter à notre serveur,
 qui a été encrypté en suivant cette [doc](https://docs.travis-ci.com/user/encrypting-files/)*

### Scripts
[create_dummy.sh](./scripts/create_dummy.sh) -> crée un fake employé dans la base en passant par l'api avec le rôle "employé".  
[deploy.sh](./scripts/deploy.sh) -> update le repo sur la branche spécifié et relance les conteneurs.  
[reset.sh](./scripts/reset.sh) -> :warning: Supprime les conteneurs ET les volumes (i.e: perte de data de la bdd) puis relance tout.

## Monitoring
https://timepool.me/monitoring
