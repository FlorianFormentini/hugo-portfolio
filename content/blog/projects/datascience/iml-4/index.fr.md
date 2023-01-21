---
title: Segmentation de clientèle
date: 2021-04-13
hero: 
menu:
  sidebar:
    name: Segmentation clients
    identifier: iml-4
    parent: datascience
draft: true
---

**Durée du projet:** 70 heures

<ins>**Étude de cas :**</ins>OLIST, une plateforme de vente en ligne, souhaite segmenter sa clientèle. L'équipe marketing a besoin d'une description de la segmentation et de sa logique sous-jacente pour une utilisation optimale.

Ma mission en tant que datascientist a été l'analyse des différents types d'utilisateurs à travers leur comportement et leurs données personnelles avec des méthodes non-supervisées ainsi qu'une proposition de contrat de maintenance basée sur une analyse de la stabilité des segments dans le temps.


## Données
Olist a fourni une **base de données anonymisée** contenant des informations sur l'historique des commandes, les produits achetés, les commentaires de satisfaction et la localisation des clients depuis janvier 2017.

### Préparation des données
1. Nettoyage: types, valeurs manquantes
1. Feature engineering: calcul de nouvelles variables pour chaque client à partir des différentes tables de données disponibles (nombre de commandes, coût moyen des dépenses, nombre de jours depuis la dernière commandes, etc..)
1. Analyse exploratoire du jeu de données final
1. Création d'un pipeline de pré-traitement contenant un encodage OneHot et une normalisation des données.

## Méthodes de segmentation
Une première segmentation a été réalisée en utilisant la répandue méthode d'analyse RFM. Cependant cette methode ne se base que sur 3 critères alors que l'on dispose de données supplémentaire potentiellement intéressantes.


2 modèles non supervisés permettant de passer cette fois toutes les colonnes ont ensuite été testées: k-Means et Gaussian Mixture Model.

