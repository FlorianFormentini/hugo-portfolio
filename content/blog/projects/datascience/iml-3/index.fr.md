---
title: Consommation énergétique de bâtiments non résidentiels
date: 2021-03-01
# hero: 
math: true
menu:
  sidebar:
    name: Conso. bâtiments 
    identifier: iml-3
    parent: datascience
    # weight: 1
---
**Durée du projet**: 100 heures

<ins>**Étude de cas :**</ins> La ville de Seattle a pour objectif de devenir une ville neutre en carbone d'ici 2050. Pour y parvenir, l'équipe du projet doit étudier les émissions des bâtiments autres que les habitations.
Des enquêtes minutieuses ont déjà été réalisées, mais elles sont coûteuses à obtenir.

Ma tâche en tant que Datascientist était d'effectuer des prédictions pour la consommation d'énergie et les émissions de C02 des bâtiments (non résidentiels) pour lesquels cela n'a pas été mesuré.

Les données comprenaient une valeur fastidieuse à obtenir, le [score 'EnergyStar'](https://www.energystar.gov/buildings/facility-owners-and-managers/existing-buildings/use-portfolio-manager/interpret-your-results/what), dont il fallait évaluer l'importance pour les prédictions afin de savoir s'il était possible de se passer de cette donnée.

## Données
Les données disponibles proviennent de la plateforme [Kaggle](https://www.kaggle.com/city-of-seattle/sea-building-energy-benchmarking#2015-building-energy-benchmarking.csv). Ce sont les permis commerciaux pour les années 2015 et 2016. Des fichiers contenant les métadonnées des colonnes sont également fournis.

[img EDA]

### Préparation des données
- Combinaison des jeux de données
- Mise à plat de colonnes contenant des dictionnaires
- Supression des colonnes jugées inutiles
- Vérification des types de chaque colonnes
- Suppression des doublons en ne gardant les valeurs de 2016
- Imputation des valeurs manquantes (par la médiane)
- Encodage OneHot des variables catégorielles


## Selection et optimisation du modèle
Plusieurs modèles de régressions ont été entrainés (régression linéaire simple, regression Ridge, RandomForest, ...) et deux métriques ont été utilisées pour évaluer et comparer les différents modèles testés sur les deux valeurs à prédire:
- Le coefficient de Pearson:  
$$ {\displaystyle R^2=1-{\dfrac {\sum_{i=1}^{n}\left(y_{i}-{\hat {y_{i}}}\right)^2}{\sum_{i=1}^{n}\left(y_{i}-{\bar {y}}\right)^2}}} $$
- L'erreur quadratique moyenne:  
$$  RMSE = \sqrt{\frac{1}{n}\sum_{i=1}^{n}{\Big(\frac{y_i -\hat{y}_i}{\sigma_i}\Big)^2}} $$

Il a été constaté que le modèle **eXtreme Gradient Boosting** (XGBoost) est celui qui obtient les meileurs performances. C'est donc ce modèle qui a été selectionné et optimisé pour réaliser des prédictions.


### Resultats obtenus

{{< img src="images/scores.png" height="300" width="400" align="center" title="Scores XGBoost" >}}
{{< img src="images/buildingTypeScores.png" height="300" width="400" float="right" title="R² par type de batiment" >}}

{{< img src="images/co2_preds.png" align="center" title="Prédiction des émissions de CO2" >}}
{{< img src="images/energy_preds.png" align="center" title="Prédiction de la consommation d'électricité" >}}

Une analyse de l'importance des features a ensuite montré que le **score EnergyStar est nécessaire** pour faire des prédictions avec ce modèle, bien que ce cette valeur soit coûteuse à obtenir.  

Avec les scores obtenus, il est possible de considérer les performances du modèle comme acceptable, cependant avec l'accord de la MOA, il pourrait être intéressant de reprendre les recherches d'un modèle en supprimant cette valeur du jeu d'entrainnement pour essayer d'obtenir des performances au moins similaires à ce modèle. De cette manière, même si les prédictions affectuée ne sont pas paraites, elles seront déja beaucoup moins coûteuses à obtenir.

Pistes d'exploration :
- Utilisation de 2 modèles différents
- Utiliation d'un modèle de prédiction mutlivariables
- Construction d'un odèle de DeepLearning pour effectuer cette tâche
