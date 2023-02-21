---
title: Suggestion de tags
date: 2021-05-20
# hero: 
menu:
  sidebar:
    name: Suggestion tags
    identifier: iml-5
    parent: datascience
math: true
isProject: true
draft: true
---

[StackOverflow](http://stackoverflow.com), célèbre forum lié au développement informatique créé en 2008, comporte aujourd'hui plusieurs millions de questions concernant des milliers de sujets différents. Lors de l'écriture d'une nouvelle question, il est nécessaire d'indiquer jusqu'à 5 tags pour que la question soit correctement catégorisée parmi toutes les rubriques du forum, ce qui peut sembler difficile aux nouveaux utilisateurs.

{{< githublink "FlorianFormentini/OC_IML_P5_TagSuggestionSystem" >}}

Ce projet faisait partie de la formation bac+5 Ingénieur Machine Learning.

**Durée du projet:** 120 heures

**Ma mission:** Concevoir un système de recommandations de tags pour faciliter l'étiquetage des nouvelles questions en testant au moinsune méthode supervisée et une méthode non-supervisée.

Ce projet faisait partie de la formation bac+5 Ingénieur Machine Learning.

{{< vs 2 >}}

## Données

StackExchange propose un outil d’export de données [StackExchange Explorer](https://data.stackexchange.com/stackoverflow/query/new) qui recense un grand nombre de données authentiques de StackOverflow. Avec une simple requête SQL il a été possible de récupérer 50 000 questions différentes déjà taguées et postées dans les 6 derniers mois.  
Un filtre a ensuite été appliqué pour ne conserver que les questions associées aux 50 tags les plus utilisés sur cette période (ainsi que les questions assicoées à 5 tags ou moins.

### Préparation

Plusieurs opérations de nettoyage été appliquées sur le texte de manière à ne conserver que les mots ayant le plus de sens dans les phrases:
- Analyse grammaticale
- Suppression des '*stop words*'
- Application d'expressions régulières (*regex*) et filtrages des mots selon le nombre d'apparition
- [Lemmatisation](https://fr.wikipedia.org/wiki/Lemmatisation)
- Création d'un dictionnaire des mots composé d'[unigrammes](https://fr.wikipedia.org/wiki/N-gramme)

Le texte ensuite été vectorisé avec la méthode TF-IDF:
$$ tfidf_{i,j}=tf_{i,j} \cdot \log {\frac  {|D|}{|\{d_j:t_i \in d_j\}|}}$$
- \\(tf_{i,j}\\) : fréquence du terme \\(t_i\\) dans le document \\(d_j\\)
- \\(|D|\\) : nombre total de documents dans le corpus
- \\({|\{d_j:t_i \in d_j\}|}\\) : nombre de documents où le terme \\(t_i\\) apparait.

De cette manière, le poids d'un mot augmente proportionnellement à son nombre d'occurrences dans un document et varie également en fonction de sa fréquence dans tout le corpus.

{{< vs 2 >}}

## Topic Modeling

En utilisant un modèle non-supervisé de [*Topic Modeling*](https://fr.wikipedia.org/wiki/Topic_model) il est possible de détecter les thèmes latents de chaque document du corpus **sous forme de nuage de mots**, puis de les associer aux tags connus des questions de manière à pouvoir déduire les tags d'une nouvelle question après détection de ses thèmes.

Pour évaluer les performances de ce genre de modèle il est possible d'utiliser une métrique qui mesure la distance relative entre les mots au sein d'un thème et en retourne la moyenne, les [*Topic Coherence Measures*](https://towardsdatascience.com/understanding-topic-coherence-measures-4aa41339634c). Il en existe plusieurs de ce genre et celle utilisée ici est [*C_V*](https://ieeexplore.ieee.org/document/8259775) comprise entre 0 et 1 et qui peut être considéré acceptable à partir de 0.55 en tendant vers 0.7.

Deux méthodes non-supervisées ont été testés: 
- [Latent Dirichlet Allocation](https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation)
- [Non-negative Matrix Factorization](https://en.wikipedia.org/wiki/Non-negative_matrix_factorization)

Les scores obtenus pour 50 thèmes différents étaient très faibles avec les 2 méthodes. En cherchant le nombre optimal de thèmes, c'est la méthodes NMF qui avait le meilleur score avec 22 thèmes. 

Il n'a pas été possible d'attribuer tous les thème trouvé à des tags connus simplement en visualisant les mots les plus importants de chaque thème. Cependant par produit matriciel il a été possible de calculer une matrice tags/thème représentant la probabilité de chaque tag d'appartenir à un thème.

Malheureusement récupérer le tag le plus probable pour chaque thème n'a permis que de retrouver 4 tags différents (les plus courants) sur 50 connus. Cette méthode n'est donc pas viable pour étiquetter correctement les questions du jeu de données.

{{< img src="img/method1.png" align="center" height="350" >}}
> En comparaison avec les tags connus, les combinaisons trouvées existes mais les proportions sont totalement incorrectes, même leur ordre.

{{< vs 2 >}}

## Classification supervisée

