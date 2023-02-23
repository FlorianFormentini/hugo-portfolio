---
title: "Compétition Kaggle - Prédiction de ventes"
date: 
# hero: 
menu:
  sidebar:
    name: Kaggle - Ventes
    identifier: iml-8
    parent: datascience
draft: true
---

Objectif de la compétition: Prédiction des ventes du conglomérat équatorien Corporación Favorita sur 16 jours. Plus exactement les ventes unitaires de milliers d'articles vendus dans les différents magasins de l'enseigne.

[Voir le kernel Kaggle](https://www.kaggle.com/code/florianformentini/store-sales-analysis-and-forecasting)

Ce projet faisait partie de la formation bac+5 Ingénieur Machine Learning.

<!-- {{< vs 1 >}}
{{< githublink "FlorianFormentini/OC_IML_P4_Olist" >}} -->

**Durée du projet:** 70 heures


## Données
Les données sont founies par [Kaggle](https://www.kaggle.com/competitions/store-sales-time-series-forecasting/data). Elles concernent toutes les ventes de 2013 à 2017, pour 54 magasins. Ces derniers sont regroupés en clusters et par types, cela représente 33 familles de produits différentes.

Une analyse de la saisonnalité a permis de construire une modélisation de la saisonnalité des ventes grâce à une [serie de Fourrier](https://www.kaggle.com/code/florianformentini/store-sales-analysis-and-forecasting).
Le jeu de données final se composait donc des paires sinus/cosinus de la série, de la moyenne glissante hebdomadaire du prix du pétrole, pour 4 jours et deux colonnes indiquant si un evènement avait lieu ce jour et si le jour était travaillé ou non.

## Selection et du modèle
La compétition est évaluée avec la Root Mean Squared Log Error:
$$RMSLE= \sqrt{ \frac{1}{n} \sum_{i=1}^n \left(\log (1 + \hat{y}_i) - \log (1 + y_i)\right)^2}$$
Cette métrique n'est pas disponible dans scikit-learn, les ventes ont alors été passées au log et les modèles ont été évalués avec la racine de erreur quadratique moyenne (RMSE).
$$RMSE= \sqrt {\frac{1}{n} \sum_{i=1}^n \left(\hat{y}_i) - y_i)\right)^2}$$



### Resultats obtenus