---
title: Introduction au Machine Learning
hero: /assets/images/heros/ai-hero.jpg
date: 2020-10-01T22:20:55+02:00
menu:
  sidebar:
    name: Intro ML
    identifier: intro_ml
    parent: posts
    # weight: 10
---

## De Développeur à Datascientist
Suite à ma formation BAC+4 (RNCP II) Responsable en Ingénierie des Logiciels, j'ai entrepris d'apprendre la conception d'Intelligences Artificielles de manière autodidacte. Pour cela, j'en ai étudié les principaux concepts au travers de différents cours en ligne (dont certains avec un [certificat de réussite](/blog/posts/certifications/) à la clé).  

### 1. Mathématiques 

J'ai vite rencontré un problème de taille : mon niveau en mathématique était insuffisant pour comprendre certain concepts de machine learning. Car même si la plupart des modèles ont déjà été implémentés dans des librairies prêtes à l'emploi, sans comprendre leur fonctionnement il m'était impossible de les utiliser efficacement. J'ai donc commencé par voir les notions essentielles qui me faisaient défaut :
- Probabilités
- Statistiques descriptives
- Statistiques inférentielles
- Calcul vectoriel / matriciel
- Calcul différentiel
- Etude des fonctions à plusieurs variables

{{< img src="ai-meme.jpg" float="right" height="300" title="Meme IA" >}}




### 2. Machine Learning: 
Une fois au point avec les mathématiques, je me suis ensuite atteler à découvrir les principaux modèles de machine learning, leur fonctionnement ainsi que des méthodes d'implémentation et d'évaluation. 
 
- Apprentissage supervisé
  - Modèles linéaires : Régression Ridge, Régression logistique, SVM
  - Modèles non linéaires : kNN, Kernel trick
- Apprentissage non supervisé : Clustering k-Means
- Méthodes ensemblistes : bagging, Random Forest, Adaboost, Gradient Boosting
- Evaluation / Amélioration des modèles :
  - Représentation graphique
  - Utilité de la Régularisation (Lasso, Elastic Net)
  - Validation croisée des données
  - Recherche des hyperparamètres par GridSearch

J'ai choisi de travailler avec Python plutôt qu'avec le langage R pour plusieurs raisons : apprentissage simple, flexibilité, popularité croissante, nombreuses opportunités d'emplois, ...


### 3. Deep Learning
En ce qui concerne le Deep Learning j'ai commencé par voir l'architecture d'un perceptron, puis comment les empiler et enfin comment apprendre au réseau ainsi formé. J'ai poursuivi en étudiant différents types de réseaux que j'ai ensuite implémentés pour différents problèmes.
- ANN (classification/régression) : prédiction du taux d'attrition d'un banque
- CNN : Prédictions chat/chien sur des images
- RNN (LSTM) : Prédiction de l'action Google
- SOM : Détection de clients frauduleux  

Mes différents projets de deep learning sont décrits plus en détails dans un autre article [disponible ici](/blog/projects/deeplearning).


  
<br/>
{{< img src="citation-einstein.png" align="center" title="citation A.Einstein" >}}
