---
title: Segmentation de clientèle
date: 2021-04-13
hero: 
menu:
  sidebar:
    name: Segmentation clients
    identifier: iml-4
    parent: datascience
isProject: true
math: true
---

OLIST, une plateforme de vente en ligne brésilienne, souhaite une segmentation de sa clientèle que l'équipe marketing pourra utiliser lors de campagnes de communications.
<!--more-->

{{< githublink "FlorianFormentini/OC_IML_P4_Olist" >}}

**Durée du projet:** 70 heures

**Mes missions:**

- Analyser le comportement et les habitudes de consommation et catégoriser les clients grâce à des méthodes non-supervisées.
- Identifier les caractériqtiques de chaque segment.
- Proposer un contrat de maintenance basé sur une analyse de la stabilité des segments dans le temps.

Ce projet faisait partie de la formation bac+5 Ingénieur Machine Learning.

{{< vs 2 >}}

## Données
Olist a fourni une **base de données anonymisée** de 9 tables contenant des informations sur l'historique des commandes, les produits achetés, les commentaires de satisfaction, la localisation des clients, etc ... depuis janvier 2017.
Toute la base de données peut être téléchargée sur la plateforme [Kaggle](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce).

- **Nettoyage des tables**: types, valeurs manquantes, aggrégation de catégories
- **Feature engineering**: calcul de nouvelles variables pour chaque client à partir des différentes tables disponibles (nombre de commandes, coût moyen des dépenses, nombre de jours depuis la dernière commandes, etc..)

L'analyse exploratoire du jeu de données final est visible sur la page Github du [notebook P4_01_EDA]().

{{< vs 2 >}}

## Segmentation RFM
Une première segmentation a été réalisée en utilisant méthode d'analyse [**RFM**](https://www.wizishop.fr/blog/dossier-la-segmentation-clients-la-methode-rfm-partie-2.html), fréquemment employée en marketing.  
L'inconvénient de cette methode est qu'elle ne se base que sur 3 critères alors que l'on dispose de données supplémentaire intéressantes permettant une classification plus fine des clients.

{{< img src="img/rfm.png" align="center" height="250" >}}

{{< vs 2 >}}

## Segmentation k-Means
Un modèle de *clustering* non supervisés a alors été testé: [**k-Means**](https://en.wikipedia.org/wiki/K-means_clustering).

Quelques traitements supplémentaires des données ont été effectués au préalable:
1. Encodage OneHot des variables catégorielles
2. Normalisation des données
3. Réduction de dimensions par **ACP** à 30 composantes (plus de 95% de la variance expliquée)

### Nombre de clusters
Le nombre obtimal de clusters à ensuite été cherché en utilisant la [**méthode Elbow**](https://en.wikipedia.org/wiki/Elbow_method_(clustering)) avec une mesure de l'erreur intra-cluster (Distortion Score) tout en s'appuyant sur une analyse du [**coefficient de Silhouette**](https://en.wikipedia.org/wiki/Elbow_method_(clustering)), une mesure de la qualité de la segmentation.

{{< img src="img/elbow.png" align="center" >}}
> La *méthode Elbow* semble indiquer 12 clusters.

{{< img src="img/silhouette.png" align="center" >}}
> L'analyse du coefficient de Silhouette a montrée que choisir 12 clusters permet le meilleur coefficient moyen avec un minimum de valeurs négatives (qui correspondent à des échantillons au delà de la frontière de décision de leur cluster, donc mal classés).

Après avoir trié les données par clusters il a été possible d'attribuer un score sur 100 pour chaque features numérique ainsi que la modalité la plus courante pour les features catégorielles, ce qui a permis de produire des visualisations facilitant l'interprétation des clusters.

### Evaluation du modèle

Le modèle a été evalué sur 2 critères en utilisant l'[**Indice de Rand Ajusté**](https://en.wikipedia.org/wiki/Rand_index) (score ARI), qui mesure les différences entre deux segmentations.
- **Stabilité à l'initialisation:** Suivant les coordonnées initiales du centroïdes de chaque cluster il peut y avoir des changements dans la classification finale des clients après un nouvel entraînement du modèle
- **Stabilité dans le temps:** Les données d'une plateforme de e-commerce évoluent très rapidement. La qualité de la segmentation ne doit pas se dégrader au fil du temps.

#### Stabilité à l'initialisation:
{{< img src="img/initStability.png" align="center" height="250" >}}
> Sur 25 entraînements, environ 10% des clients n'ont pas été attribués au même segment.

La méthode d'initialisation [*k-means++*](https://en.wikipedia.org/wiki/K-means%2B%2B) initialise les centroïdes en utilisant un échantillonnage basé sur une distribution de probabilité empirique de la contribution des points à l'inertie globale.  
Ce léger manque de stabilité peux donc indiquer un problème lié aux données utilisées ou aux traitements appliqués.

#### Stabilité dans le temps:
Disposant de plusieurs années de données, un modèle de test a été entrainé avec les données de la première année.  
De nouvelles segmentations ont été effectuées sans réentrainer le modèle, en ajoutant à chaque fois un mois de données supplémentaire (avec recalcul complet pour mettre à jour les clients déja connus)

{{< img src="img/timeStability.png" align="center" height="250" >}}
> En plus du problème de stabilité à l'initialisation, on peut identifier une légère tendance à la baisse qui s'emplifie après 10 mois de données supplémentaires, ce qui montre que la classification des clients change de plus en plus au fil du temps.  

Ce test à permis d'obtenir une segmentation sur toutes les données avec un modèle entrainé uniquement sur la première année. En comparant cette segmentation à celle obtenue avec le modèle entrainé sur la totalité des données, il est possible de constater une très grande différence de répartition des clients.  
Un réentrainnement régulier sera donc nécessaire bien qu'une classification des nouveaux clients reste possible durant quelques mois.


{{< vs 2 >}}

## Conclusion

Le modèle k-Means à permis une segmentation des clients en 12 catégories aux caractéristiques identifiables et distinctes.  
Malgrès un léger problème de stabilité à l'initialisation du modèle cette segmentation peut être utilisée pendant quelques mois pour catégoriser les nouveaux clients, mais au minimum 2 entrainements par an seront nécéssaires.

Il est également possible d'utiliser en parallèle la segmentation de l'analyse RFM (dont les résultats sont déterministes) que les équipes marketing savent déja interprêter, pour les aider à comprendre chaque segment.

**Pistes d'exploration futures:**
- Retravailler les données ou trier les features utilisées pour tenter d'améliorer la stabilité du modèle
- Changer la méthode d'initialisation des centroïdes
- Tester d'autres modèle de clustering non-supervisés