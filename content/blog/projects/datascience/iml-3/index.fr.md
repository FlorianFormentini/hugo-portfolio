---
title: Consommation énergétique et émissions de CO2
date: 2021-03-01
hero: images/seattle.jpg
math: true
menu:
  sidebar:
    name: Conso. bâtiments 
    identifier: iml-3
    parent: datascience
    # weight: 1
isProject: true
---


**Étude de cas**: La ville de Seattle a pour objectif de devenir une ville neutre en carbone d'ici 2050. Pour y parvenir, l'équipe du projet doit étudier les émissions de C02 ainsi que la consommation énergétique des bâtiments **non résidentiels**. Des enquêtes minutieuses ont déjà été réalisées, mais elles sont coûteuses à obtenir.

{{< githublink "FlorianFormentini/OC_IML_P3_EnergyConsumption" >}}

**Durée du projet**: 100 heures.

**Missions**:
- Prédire la consommation d'énergie et les émissions de CO2 des bâtiments non résidentiels de Seattle.
- Evaluer l'importance du score [*EnergyStar*](https://www.energystar.gov/buildings/facility-owners-and-managers/existing-buildings/use-portfolio-manager/interpret-your-results/what) pour les prédictions car c'est une des données couteuses à calculer. 

{{< vs 2 >}}

## Données
Les données disponibles proviennent de la plateforme [Kaggle](https://www.kaggle.com/city-of-seattle/sea-building-energy-benchmarking#2015-building-energy-benchmarking.csv). Ce sont les données des permis de construire de la ville de Seattle pour les années 2015 et 2016 ainsi que des fichiers de métadonnées associés.

{{< img src="images/targets_boxplot.png" height="400" align="center" title="Target Features Distribution" >}}

### Nettoyage

- Combinaison des fichiers de données
- Suppression des doublons et des lignes concernant les batiments résidentiels en ne gardant les valeurs les plus récentes
- Gestion des valeurs abérrantes ou manquantes
- Feature Engineering
- Supression des colonnes jugées inutiles (aucune informations importantes, *data leakage*, haute corrélation, ...)

> Les visualisations de l'analyse exploratoire sont disponibles sur la page Github du notebook [Pelec_01_EDA](https://github.com/FlorianFormentini/OC_IML_P3_EnergyConsumption/blob/master/Pelec_01_EDA.ipynb).

### Préparation

- Encodage OneHot des variables catégorielles
- Normalisation des données
- Imputation des valeurs manquantes restantes avec le **modèle kNN**
- Séparation 80/20 aléatoire des données en un jeu d'entrainement et un jeu de test (stratifiée selon le type de batiments)

{{< vs 2 >}}

## Sélection d'un modèle
<!-- Plusieurs pistes ont été envisagées:  
1. Recherche d'un modèle de régression par type de prédiction à effectuer (CO2 / énergies)
2. Recherche d'un modèle de régression multi-sorties -->

Deux métriques ont été utilisées pour évaluer et comparer les différents modèles testés sur les deux valeurs à prédire:
{{< split 6 6>}}
Le coefficient de Pearson:  
$$ {\displaystyle R^2=1-{\dfrac {\sum_{i=1}^{n}\left(y_{i}-{\hat {y_{i}}}\right)^2}{\sum_{i=1}^{n}\left(y_{i}-{\bar {y}}\right)^2}}} $$
---
L'erreur quadratique moyenne:  
$$  RMSE = \sqrt{\frac{1}{n}\sum_{i=1}^{n}{\Big(\frac{y_i -\hat{y}_i}{\sigma_i}\Big)^2}} $$
{{< /split >}}

Plusieurs types de modèles supervisés on été comparés : linéaires et non-linéaires (SVM, modèles ensemblistes) ainsi qu'un réseau de neurones.  
Pour réduire les risques de surapprentissage l'entrainement a été fait avec une **validation croisée à 10 folds**.

### Resultats obtenus

{{< split 6 6 >}}
**CO2**
{{< bootstraptables "table compact" >}}
| Modèle       | R²     | RMSE  | Entrainement (s) |
| ------------ |:------:|:-----:|:----------------:|
| Ridge        | 0.609  | 0.830 | 0.032            |
| Lasso        | -0.002 | 1.333 | 0.028            |
| Elasticnet   | -0.002 | 1.333 | 0.018            |
| LinearSVR    | 0.582  | 0.858 | 0.061            |
| Kernel SVR   | 0.595  | 0.845 | 0.297            |
| RandomForest | 0.661  | 0.770 | 3.018            |
| XGBoost      | 0.705  | 0.721 | 0.768	           |
| MLP          | 0.572  | 0.867 | 28.451           |
{{< /bootstraptables >}}

---
**Energies**
{{< bootstraptables "table compact" >}}
| Modèle       | R²     | RMSE  | Entrainement (s) |
| ------------ |:------:|:-----:|:----------------:|
| Ridge        | 0.662  | 0.871 | 0.015            |
| Lasso        | -0.006 | 1.575 | 0.009            |
| Elasticnet   | -0.006 | 1.575 | 0.013            |
| LinearSVR    | 0.522  | 1.067 | 0.039            |
| SVR          | 0.429  | 1.175 | 0.217            |
| RandomForest | 0.698  | 0.815 | 1.508            |
| XGBoost      | 0.730  | 0.739 | 0.402            |
| MLP          | 0.544  | 1.062 | 37.603           |
{{< /bootstraptables >}}
{{< /split >}}

Il a été constaté que le modèle **eXtreme Gradient Boosting** (XGBoost) est celui qui obtient les meilleures performances. C'est donc ce modèle qui a été selectionné pour réaliser les prédictions.  
L'optimisation des hyperparamètres a alors été réalisée avec une **GridSearch** pour chaque variable à prédire ce qui a permis de meilleurs scores mais la différence de performances entre les deux modèles a été accentuée:
$$CO_2: R²=0.732$$
$$Energies: R²=0.904$$

Cette différence peut s'expliquer par le fait qu'il y plus de features en rapport aux énergies consommé dans les données.

{{< vs 1 >}}

{{< img src="images/co2_preds.png" align="center" title="Prédiction des émissions de CO2" >}}
{{< vs 1 >}}

{{< img src="images/energy_preds.png" align="center" title="Prédiction de la consommation d'électricité" >}}
{{< vs 2 >}}

### Score EnergyStar

Une **analyse de l'importance des features** a ensuite montrée que le score EnergyStar est une des colonnes qui influents le plus les prédictions de chaque modèle. Comme cette valeur est coûteuse à obtenir, toute la procédure de sélection et d'optimisation de modèles à été recommencée en ayant supprimé le score EnergyStar du jeu de données.  
C'est encore le modèle XGBoost qui a obtenu les meilleures performances, avec des scores légèrements inférieurs à la version précédente  dont une différence un peu plus marquée pour les pédictions d'émissions de CO2.

{{< img src="images/energystar_comparison.png" height="350" width="500" align="center" title="R² par type de batiment" >}}
{{< vs 2 >}}

## Conclusion

On peut considérer les prédictions obtenues comme acceptables et il est possible de se passer du score EnergyStar sans pertes de performances significatives. Il revient alors à la MOA de décider s'il est possible d'arrêter le calcul de cette valeur ou s'il est préférable de continuer les recherches d'un modèle plus performant surtout pour les prédictions sur le CO2.

**Pistes de recherches futures**:
- Utiliser une méthode de réduction de dimensions sur les données
- Construction d'un modèle de régression multi-sorties
- Construction plus avancée d'un modèle de DeepLearning avec des librairies telles que TensorFlow / PyTorch
