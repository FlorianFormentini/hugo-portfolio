---
title: Credit Scoring
date: 2022-03-11
hero: img/hero.jpg
menu:
  sidebar:
    name: Scoring
    identifier: iml-9
    parent: datascience
draft: false
isProject: true
math: true
---

Une banque qui accorde des prêts à la consommation souhaite un outil de "scoring crédit" pour calculer la probabilité qu’un client rembourse son crédit en s’appuyant sur des sources de données variées (données comportementales, données provenant d'autres institutions financières, etc.).  
Cet outil doit aussi intégrer un dashboard interactif pour que les chargés de relation client puissent expliquer de façon la plus transparente possible les décisions d’octroi ou d'un refus de crédit.

Ce projet faisait partie de la formation bac+5 Ingénieur Machine Learning.

{{< vs 1 >}}
{{< githublink "FlorianFormentini/OC_IML_P9_Scoring" >}}


**Durée du projet:** 120 heures

{{< vs 2 >}}

## Données
Les données utilisées proviennent de [Kaggle](https://www.kaggle.com/c/home-credit-default-risk/data). Ce sont les réponses au questionnaire à remplir lors de la demande d'un crédit, avec une variable indiquant si le prêt a été accordé ou non. Diverses tables en rapports avec l'historique des prêts et demandes des clients sont également disponibles.

Une analyse exploratoire a permis la construction du jeu de données final et son premier nettoyage (doublons valeurs manquantes, gestion de la colinéarité). Une séparation 80/20 en conservant le ratio d'accords/refus de crédits a permis d'en dégager un jeu de tests.

Un pipeline de traitements a ensuite été construit pour gérer l'imputation des valeurs manquantes restantes, l'encodage des variables catégorielles et la normalisation des variables numériques.

### Déséquilibre des classes
Dans les données disponibles le nombre de crédits acceptés est largement supérieur au nombre de refus, ce qui peut biaiser les prédictions. Deux méthodes ont été testées pour résoudre ce problème:
- Rééchantillonnage (oversampling / undersampling)
- [Cost-Sensitive Learning](https://machinelearningmastery.com/cost-sensitive-learning-for-imbalanced-classification/)

{{< vs 2 >}}

## Selection du modèle
Pour la banque il est plus grave d'accorder un prêt alors que le client ne peut pas le rembourser, plutôt que de le refuser à quelqu'un qui pourrait le rembourser.  
Il faut donc minimiser le nombre de faux positifs (erreurs de type I) et pour cela les modèles testés ont été évalués avec plusieurs métriques:
- \\(\text{precision} = \frac{TP}{TP+FP}\\)
- Accuracy personnalisée qui pénalise les faux positifs: \\(\text{CustomAccuracy} = \frac{TP}{TP + TN + FP*10 + FN*.1}\\)
- Les courbes [*ROC*](https://fr.wikipedia.org/wiki/Courbe_ROC) et [*Precision-Recall*](https://scikit-learn.org/stable/auto_examples/model_selection/plot_precision_recall.html#:~:text=The%20precision%2Drecall%20curve%20shows,a%20low%20false%20negative%20rate.) ont été utilisées pour évaluer les probabilités et ajuster le seuil de décision des modèles (ROC si très petit déséquilibre entre classes, et la courbe AP si le déséquilibre n'est pas géré).

Plusieurs modèles de classification binaires ont alors été comparés et le modèle [XGBoost](https://blent.ai/xgboost-tout-comprendre/) est celui qui a obtenu les meilleurs performances. Après une optimisation des hyperparmètres par *GridSearch* le seuil de décision a été ajusté. Ce qui a permis d'obtenir les scores suivants:

{{< img src="img/xxx.png" align="center"  height="200">}}
<!-- table avec scores + confusion matrix -->

### Interprétation des prédictions
En utilisant le package [Shap](https://shap.readthedocs.io/en/latest/index.html), il a été possible de mieux comprendre le modèle et ses prédictions, déjà avec une analyse de l'importance des features.

{{< img src="img/shap.jpg" align="center"  height="200" >}}
{{< vs 1 >}}
En produisant des [*force plots*](https://medium.com/mlearning-ai/shap-force-plots-for-classification-d30be430e195), il a aussi été possible de connaîtres les valeurs qui ont le plus influées la probabilité prédite pour un client.

{{< img src="img/forceplot.png" align="center"  height="200" >}}

{{< vs 2 >}}

### Dashboard interactif
Le développement d'un dashboard pour les chargés de relation client s'est fait en deux parties:
1. Une API RESTful avec le framework [FastAPI](https://fastapi.tiangolo.com/) permettant des appels au modèle entrainé
2. Un *frontend* composé d'un simple script Python utilisant le package [Streamlit](https://streamlit.io/), qui consomme l'API et permet l'affichage du score et de son interprétation.

L'application a finalement été "*Dockerizée*", avec un fichier docker-compose prévu pour faciliter l'exécution locale. Et le tout fut déployé sur des plans gratuits de l'hébergeur [Heroku](https://www.heroku.com/).