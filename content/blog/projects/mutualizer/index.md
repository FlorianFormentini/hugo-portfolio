---
title: Harmonisation Mutuelles
date: 2018-11-14
hero: tesseract.jpg
menu:
  sidebar:
    name: Mutuelles
    identifier: mutualizer
    parent: projects
    # weight: 11
isProject: true
---

**Étude de cas:** L’association inter-AMC (Assurance Maladie Complémentaire) souhaite une solution pour simplifier la mise en œuvre du tiers payant pour les prestataires de soins. Les fédérations de complémentaires se sont organisées pour proposer un cahier des charges permettant d’assurer un niveau minimum d’harmonisation des attestations et de permettre au prestataire de soins d’acquérir sans saisie les éléments ainsi définis. 

Ce projet a été réalisé dans le cadre d'un cours **C#** au CESI Alternance en équipes de 4 personnes : 1 chef de projet et 3 développeurs.

**L'objectif était donc de proposer un prototype d'application permettant la récupération automatique des informations d'une carte de mutuelle.** :
- Nom de mutuelle
- Numéro AMC
- Le/les types de conventions
- Critère secondaire de routage (CSR)
- Numéro d'adhérent de l'assuré
- Lecture du *Datamatrix* contenant les données nécessaire pour interroger l’Annuaire AMC, et le lien vers les services en ligne.


Nous avons choisis de concevoir une application client lourd C#/WPF de manière à pouvoir envisager une future liaison directe entre le scanner du praticien et l'application.  
Nous avons ensuite utilisé 2 librairies pour la lecture des données:
 1. [DataMatrix.Net](http://datamatrixnet.sourceforge.net/) : qui permet la lecture d'un DataMatrix dans une image.
 2. L'OCR [Tesseract](https://opensource.google/projects/tesseract) de Google : qui permet de reconnaitre du texte dans une image. 

Grace à une liste de différentes mutuelle et des images de leur cartes nous avons pu préconfigurer des zones de recherches pour l'OCR afin de chercher plus efficacement les données, avec un profil par défaut (recherche sur toute la carte) au cas où le nom de mutuelle ne serait pas connus ou mal détecté. Ces configurations comprenaient aussi l'emplacement du *Datamatrix*

L'UI très simpliste permettait simplement d'importer une image et de l'afficher, avec des champs modifiables pour les données extraites.  
Un menu permettait aussi de choisir manuellement la configuration de l'OCR, de relancer la détection, ainsi que l'export des données dans un fichier JSON. 

Les tests réalisées sur plusieurs scans de cartes de mutuelles étaient majoritairement concluants. Certains types de cartes avec des polices d'écritures très petites produisaient parfois des artefacts dans les chaines de caractères récupérées. Pour résoudre ce problème, nous avons ajouté des règles de nettoyage par expressions régulières et les champs affectés s'affichaient en rouge pour indiquer qu'une vérification était nécessaire. Utiliser le profil par défaut pouvait aussi améliorer les résultats lorsque le scan de la carte n'était pas droit.


Pistes d'amélioration: 
- Scan des cartes depuis l'application
- Affichage des zones de détection sur l'image avec possibilité de les déplacer
- Possibilité d'ajouter et modifier des profils de recherches
- Lien direct avec une base de données
