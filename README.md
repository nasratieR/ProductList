# Product List
Ce projet permet de lister, créer, modifier, et supprimé les produit present dans la base de donné MongoDB associée 

## Installation de l'API

Accédez au dossier artisan-product-api :

```cd artisan-product-api```


Installez les dépendances :

```npm install```


Configurez les variables d'environnement :
Créez un fichier .env dans le dossier artisan-product-api.
Ajoutez les paramètres suivants :

PORT=5001

MONGO_URI=mongo_db

Lancez le serveur :

```npm start```

L'API sera disponible à l'adresse suivante : http://localhost:5001.

## Installation de l'App##

Accédez au dossier artisan-product-app :

```cd artisan-product-app```


Installez les dépendances :

```npm install```


Configurez l'URL de l'API :

const BASE_URL = 'http://localhost:5001/';

Lancez l'application :

```npm start```


L'application sera disponible à l'adresse suivante : http://localhost:3000.
