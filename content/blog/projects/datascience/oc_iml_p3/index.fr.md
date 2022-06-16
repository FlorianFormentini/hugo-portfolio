---
title: Consommation des bâtiments non résidentiels
date: 2021-03-01
# hero: 
math: true
menu:
  sidebar:
    name: Consommation batiments 
    identifier: oc_iml_p3
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

## Évaluation des modèles
Deux métriques ont été utilisées pour évaluer et comparer les différents modèles testés :
- Le coefficient de Pearson:  
$$ {\displaystyle R^2=1-{\dfrac {\sum_{i=1}^{n}\left(y_{i}-{\hat {y_{i}}}\right)^2}{\sum_{i=1}^{n}\left(y_{i}-{\bar {y}}\right)^2}}} $$
- L'erreur quadratique moyenne:  
$$  RMSE = \sqrt{\frac{1}{n}\sum_{i=1}^{n}{\Big(\frac{y_i -\hat{y}_i}{\sigma_i}\Big)^2}} $$

## Résultats obtenus
Plusieurs modèles de régressions ont été entrainés et il a été constaté que le modèle **eXtreme Gradient Boosting** (XGBoost) est celui qui obtient les meileurs performances. C'est donc ce modèle qui a été selectionné et optimisé pour réaliser les prédictions.  
Et avec ce modèle, l'analyse de l'importance des features a montré que le score EnergyStar est nécessaire pour faire des prédictions.

{{< img src="images/scores.png" height="300" width="400" float="left" title="Scores XGBoost" >}}
{{< img src="images/buildingTypeScores.png" height="300" width="400" float="right" title="R² par type de batiment" >}}

{{< img src="images/co2_preds.png" align="center" title="Prédiction des émissions de CO2" >}}
{{< img src="images/energy_preds.png" align="center" title="Prédiction de la consommation d'électricité" >}}
