---
title: Suggestion de tags
date: 2021-05-20
# hero: 
menu:
  sidebar:
    name: Suggestion tags
    identifier: iml-5
    parent: datascience
isProject: true
---

[StackOverflow](http://stackoverflow.com), célèbre forum lié au développement informatique créé en 2008 , comporte aujourd'hui plusieurs millions de questions concernant des milliers de sujets différents. Lors de l'écriture d'une nouvelle question, il est nécessaire d'indiquer jusqu'à 5 tags pour que la question soit correctement catégorisée parmi toutes les rubriques du forum, ce qui peut sembler difficile aux nouveaux utilisateurs.

{{< githublink "FlorianFormentini/OC_IML_P5_TagSuggestionSystem" >}}

**Durée du projet:** 120 heures

**Ma mission:** Concevoir un système de recommandations de tags pour faciliter l'étiquetage des nouvelles questions (classification multiple de texte).

Ce projet faisait partie de la formation bac+5 Ingénieur Machine Learning.

{{< vs 2 >}}

## Données

StackExchange, le réseau de sites dont StackOverfow fait partie, propose l'outil d’export de données [StackExchange Explorer](https://data.stackexchange.com/stackoverflow/query/new) qui recense un grand nombre de données authentiques de la plateforme. Avec une simple requête SQL il a été possible de récupérer 50 000 questions différentes déjà taguées et postées dans les 6 derniers mois.  
Un filtre a ensuite été fait pour ne conserver que les questions associées aux 50 tags les plus utilisés sur cette période.

### Préparation des données

Plusieurs opérations de nettoyage été appliquées sur le texte de manière à ne conserver que les mots ayant le plus de sens dans les phrases (analyse grammaticale, '*stop words*', expression régulières)
Ces derniers ont ensuite été normalisés par '*lemmatisation*', ce qui consiste à ne garder que la forme canonique de chaque terme.
Enfin, le tout a été vectorisé avec la méthode TF-IDF:
$$ {\displaystyle tfidf_{i,j}=tf_{i,j} \cdot \log {\frac  {|D|}{|\{d_j:t_i \in d_j\}|}}} $$
- $tf_{i,j}$ : fréquence du terme $t_i$ dans le document $d_j$
- $|D|$ : nombre total de documents dans le corpus
- ${|\{d_j:t_i \in d_j\}|}$ : nombre de documents où le terme $t_i$ apparait.

De cette manière, le poids d'un mot augmente proportionnellement à son nombre d'occurrences dans un document et varie également en fonction de sa fréquence dans tout le corpus.


## Construction du modèle

Deux approches différentes ont été envisagées :
1.	La première méthode consistait à utiliser un modèle non-supervisé afin de détecter les thèmes principaux des questions. Ensuite avec un ensemble de questions étiquetées il a été possible d'associer les thèmes dominants détectés aux tags pour chaque questions, puis d'utiliser ces associations pour extrapoler les tags de nouvelles questions.

2.	La seconde méthode se basait sur l'utilisation d'un modèle supervisé de classification multi-labels entrainé sur un ensemble de questions déjà taguées et vectorisées.


### Méthode non-supervisée

En utilisant un modèle de '*Topic Modeling*' il est possible de détecter les thèmes latents abordés dans chaques documents d'un corpus (sous forme de nuage de mots), puis de les associer aux tags connus des questions. De manière à pouvoir déduire les tags d'une nouvelle question après détection de ses thèmes.

Pour évaluer les performances de ce genre de modèle il est possible d'utiliser un score de cohérence qui mesure la distance relative entre les mots au sein d'un thème et en retourne la moyenne. Il existe plusieurs métriques de ce genre et celle utilisée ici est [*C_V*](https://ieeexplore.ieee.org/document/8259775) comprise entre 0 et 1 et qui peut être considéré bon entre ~0.55 et s'il tend vers 0.7.

Deux modèles différents ont été testés : 
- [Latent Dirichlet allocation](https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation)