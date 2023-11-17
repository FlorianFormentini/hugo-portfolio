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

Prédiction de 16 jours de ventes unitaires de milliers d'articles du conglomérat équatorien [Corporación Favorita](https://www.corporacionfavorita.com/). 
Avec l'objectif personnel de terminer dans le top 100 du leaderboard de la comptétion.

[Voir le kernel Kaggle](https://www.kaggle.com/code/florianformentini/store-sales-analysis-and-forecasting)


<!-- {{< vs 1 >}}
{{< githublink "FlorianFormentini/OC_IML_P4_Olist" >}} -->

**Durée du projet:** 70 heures


## Données
Les données sont founies par [Kaggle](https://www.kaggle.com/competitions/store-sales-time-series-forecasting/data). Elles concernent toutes les ventes de 2013 à 2017, pour 54 magasins. Ces derniers sont regroupés en clusters et par types, cela représente 33 familles de produits différentes.

Une analyse de la saisonnalité a permis de construire une modélisation des ventes grâce à une [serie de Fourrier](https://www.kaggle.com/code/florianformentini/store-sales-analysis-and-forecasting).
Le jeu de données final se composait donc des paires sinus/cosinus de la série, de la moyenne glissante hebdomadaire du prix du pétrole, pour 4 jours et deux colonnes indiquant si un evènement avait lieu dans le pays et si le jour était ouvrable.

La compétition est évaluée avec la Root Mean Squared Log Error:
$$RMSLE= \sqrt{ \frac{1}{n} \sum_{i=1}^n \big(\log (1 + \hat{y}_i) - \log (1 + y_i)\big)^2}$$
Cette métrique n'est pas disponible dans scikit-learn, les ventes ont alors été passées au log et les modèles ont été évalués avec la racine de erreur quadratique moyenne (RMSE) de scikit-learn pour continuer à bénéficier des [optimisations du package](https://www.quantmetry.com/blog/scikit-learn-consortium-performance-parallel-computing/).

## Construction du modèle

Plusieurs modèles ont été entrainés et comparés, avec une légère drecherche des hyperparmètres et une validation-croisée à 3 folds:
- Régression linéaire
- Régression Ridge
- Forêt aléatoire
- eXtreme Gradient Boosting

L'écart entre les scores des différents modèles n'était pas très grand (σ = 0.03), mais la forêt aléatoire obtenu le meilleur score de 0.36.   
Cependant par rapport au leaderboard de la compétition c'était largement insuffisant pour atteindre le top 100.

En analysant les prédictions obtenues il a été possible d'identifier quelques catégories de produits pour lesquelles le modèles performait beaucoup moins bien, alors que d'autres modèles testés obtenaient de très bons résultats dessus.

### Modèle hybride
Un modèle personnalisé a donc été construit d'une part avec les modèles RandomForest, ExtraTreesRegressor et BaggingRegressor, aggrégés par un méta-modèle de [*Voting*](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.VotingRegressor.html) pour la plupart des prédictions.  
Et d'autre part les modèles SVR et Ridge aggrégés par un second modèle de *Voting* pour prédire uniquement les produits des familles identifiées précédemment.

En utilisant le package [joblib](https://joblib.readthedocs.io/en/latest/) il a été possible de construire la classe du modèle en parallèlisant les calculs pour accélérer l'entrainement tout restant compatible avec les méthodes de scikit-learn, notamment *GridSearchCV*.

 

### Resultats obtenus