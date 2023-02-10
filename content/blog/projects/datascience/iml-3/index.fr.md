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
| Ridge        | 0.604  | 0.844 | 0.028            |
| Lasso        | -0.007 | 1.351 | 0.013            |
| Elasticnet   | -0.007 | 1.351 | 0.015            |
| LinearSVR    | 0.582  | 0.867 | 0.041            |
| Kernel SVR   | 0.604  | 0.846 | 0.258            |
| RandomForest | 0.663  | 0.780 | 2.937            |
| XGBoost      | 0.701  | 0.732 | 0.436            |
| MLP          | 0.581  | 0.867 | 26.078           |
{{< /bootstraptables >}}

---
**Energies**
{{< bootstraptables "table compact" >}}
| Modèle       | R²     | RMSE  | Entrainement (s) |
| ------------ |:------:|:-----:|:----------------:|
| Ridge        | 0.673  | 0.871 | 0.015            |
| Lasso        | -0.011 | 1.575 | 0.009            |
| Elasticnet   | -0.011 | 1.575 | 0.013            |
| LinearSVR    | 0.557  | 1.067 | 0.039            |
| SVR          | 0.478  | 1.175 | 0.217            |
| RandomForest | 0.710  | 0.815 | 1.508            |
| XGBoost      | 0.773  | 0.739 | 0.402            |
| MLP          | 0.285  | 1.062 | 37.603           |
{{< /bootstraptables >}}
{{< /split >}}

Il a été constaté que le modèle **eXtreme Gradient Boosting** (XGBoost) est celui qui obtient les meilleures performances. C'est donc ce modèle qui a été selectionné pour réaliser les prédictions.  
L'optimisation des hyperparamètres a alors été réalisée avec une **GridSearch** pour chaque variable à prédire ce qui a permis d'obtenir ces scores finaux:
$$CO_2: R²=0.723$$
$$Energies: R²=0.858$$

{{< vs 1 >}}

{{< img src="images/co2_preds.png" align="center" title="Prédiction des émissions de CO2" >}}
{{< vs 1 >}}

{{< img src="images/energy_preds.png" align="center" title="Prédiction de la consommation d'électricité" >}}
{{< vs 2 >}}

### Score EnergyStar

Une **analyse de l'importance des features** a ensuite montrée que le score EnergyStar est une des colonnes qui influents le plus les prédictions de chaque modèle. Comme cette valeur est coûteuse à obtenir, toute la procédure de sélection et d'optimisation de modèles à été recommencée en ayant supprimé le score EnergyStar du jeu de données.  
C'est encore le modèle XGBoost qui a obtenu les meilleures performances, cependant les scores sont nettements inférieurs à la version précédente, surtout pour le modèle de prédiction des émissions de CO2.

{{< img src="images/buildingTypeScores.png" height="350" width="500" align="center" title="R² par type de batiment" >}}
{{< vs 2 >}}

## Conclusion

On peut considérer les prédictions obtenues comme acceptables en conservant le score EnergyStar. Il revient alors à la MOA de décider si les économies réalisées sur le calcul de cette colonne valent la perte de précisions des prédictios, ou s'il est préférable de continuer les recherches d'un modèle plus performant qui n'utiliserait pas le score EnergyStar.

**Pistes de recherches futures**:
- Utiliser une méthode de réduction de dimensions sur les données
- Construction d'un modèle de régression multi-sorties
- Construction plus avancée d'un modèle de DeepLearning avec des librairies telles que TensorFlow / PyTorch
