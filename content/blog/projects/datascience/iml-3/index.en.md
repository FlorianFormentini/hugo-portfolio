---
title: Energy consumption of non-residential buildings
date: 03-2021
# hero: 
math: true
menu:
  sidebar:
    name: Seattle Buildings
    identifier: oc_iml_p3
    parent: datascience
    # weight: 1
draft: true
---

{{< githublink "FlorianFormentini/OC_IML_P3_EnergyConsumption" >}}

**Project duration**: 100 hours

The city of Seattle aims to be a carbon neutral city by 2050. To achieve this, the project team needs to study the emissions from non-housing buildings.
Careful surveys have already been done, but they are expensive to obtain.

My task as a datascientist was to try to predict the energy consumption and C02 emissions of buildings for which this has not been measured.

There is also a tedious piece of data to obtain, the EnergyStar score, the importance of which should be evaluated for predictions in order to know whether it can be excluded or not.

Les données comprenaient une valeur fastidieuse à obtenir, le [score 'EnergyStar'](https://www.energystar.gov/buildings/facility-owners-and-managers/existing-buildings/use-portfolio-manager/interpret-your-results/what), dont il fallait évaluer l'importance pour les prédictions afin de savoir s'il était possible de se passer de cette donnée.

## Données
The available data comes from [Kaggle](https://www.kaggle.com/city-of-seattle/sea-building-energy-benchmarking#2015-building-energy-benchmarking.csv). These are the commercial permits for the years 2015 and 2016. Files containing column metadata are also provided.

## Choix d'un modèle
Two metrics were used to evaluate and compare several models:
- Persaon coefficent:  
$$ {\displaystyle R^2=1-{\dfrac {\sum_{i=1}^{n}\left(y_{i}-{\hat {y_{i}}}\right)^2}{\sum_{i=1}^{n}\left(y_{i}-{\bar {y}}\right)^2}}} $$
- The Root Mean Squared Error:  
$${\displaystyle RMSE = \sqrt{\frac{1}{n}\sum_{i=1}^{n}{\Big(\frac{y_i -\hat{y}_i}{\sigma_i}\Big)^2}}}$$

# Résultats obtenus
Several regression models were trained and it was found that the **eXtreme Gradient Boosting** (XGBoost) model is the one that performs the best. It is therefore this model that was selected and optimized to make the predictions
And with this model, the EnergyStar score is required to make predictions.

{{< img src="images/scores.png" height="300" width="400" float="left" title="XGBoost scores" >}}
{{< img src="images/buildingTypeScores.png" height="300" width="400" float="right" title="R² by building type" >}}
{{< img src="images/co2_preds.png" align="center" title="CO2 emissions" >}}
{{< img src="images/energy_preds.png" align="center" title="Energy consuption" >}}
