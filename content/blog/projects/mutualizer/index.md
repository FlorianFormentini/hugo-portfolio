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

L’association inter-AMC (pour Assurance Maladie Complémentaire) souhaite une solution pour simplifier la mise en œuvre du tiers payant pour les prestataires de soins. Constatant que la présentation des attestations devait être harmonisée entre les complémentaires, les fédérations de complémentaires se sont organisées pour proposer un cahier des charges permettant d’assurer un niveau minimum d’harmonisation des attestations et de permettre au prestataire de soins d’acquérir sans saisie les éléments ainsi définis. 

Ce projet a été réalisé dans le cadre d'un cours **C#** au CESI Alternance en équipes de 5 personnes : 1 chef de projet et 4 développeurs. 

**Ce projet consistait donc en la récupération des données trouvables sur une carte de mutuelle sans que le prestataire de soins n'ai à les saisir manuellement.**  
 Pour cela, nous devions concevoir une solution permettant de lire le **Datamatrix** trouvable sur la carte de mutuelle d'un assuré car celui-ci contient les données nécessaire pour interroger l’Annuaire AMC, lancer les services en ligne et pour récupérer l’adresse de redirection.  
Les informations à récupérer étaient donc le numéro d'AMC, le ou les types de conventions, le critère Secondaire de Routage (CSR) et le numéro d'adhérent de l'assuré.

Dans un second temps, le projet imposait de trouver un moyen de récupérer le nom de la mutuelle trouvable sur la carte et de le comparer à une liste de mutulle connues dans un dictionnaire à notre disposition.

![schema-projet](/assets/images/projects/mutualizer.png#center)

Avec le peu de temps qui nous était imparti nous nous sommes orienté vers la conception d'une application lourde C#/WPF très simpliste intégrant deux librairies tierces :
 1. [DataMatrix.Net](http://datamatrixnet.sourceforge.net/) : qui permet la lecture d'un DataMatrix dans une image.
 2. L'OCR [Tesseract](https://opensource.google/projects/tesseract) de Google : qui permet de reconnaitre du texte dans une image. 

[Insérer description de l'utilisation des librairies : montrer du code]