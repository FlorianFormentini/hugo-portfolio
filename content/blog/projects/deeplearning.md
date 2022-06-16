---
title: "Tests Deep Learning"
date: 2020-07-02T19:07:32+02:00
hero: /images/heros/ai-hero.jpg
menu:
  sidebar:
    name: Tests Deep Learning
    identifier: projets-test-dl
    parent: projects
    # weight: 12
---


Afin d'apprendre les concepts de base du Deep Learning j'ai suivi un cours en ligne sur la plateforme Udemy : [Le Deep Learning de A à Z](https://www.udemy.com/course/le-deep-learning-de-a-a-z/).  
Au fil de ce cours j'ai appris à construire différents types de réseaux de neuronnes et je me suis ensuite entrainné en les implémentant dans différents contextes.

## 1. Prédiction du taux d'attrition
**Artificial Neural Network : Modèle de classification**

**<ins>Etude de cas :</ins>** Une banque a remarqué que de plus en plus de ses clients partent pour la concurrence. Cette banque souhaite donc identifier le segment de sa clientèle le plus susceptible de partir afin par exemple de pouvoir leur faire une offre les incitant à rester. Pour cela elle fournit un dataset contenant des informations sur 10000 clients (*11 features*) et une variable indiquant si ces personnes sont toujours clientes de la banque ou non.

Le réseau de neurones utilisé est constitué de deux couches cachées de 6 neurones chacunes utilisant la fonction Redresseur (*relu*) et une régularisation par Dropout de 10%, ainsi qu'une couche de sortie constituée d'un seul neurone utilisant la fonction d'activation *Sigmoïde*.  
L'entraînement du modèle s'est fait en utilisant la fonction de cout logistique (*binary cross entropy*) avec 100 passages du jeu d'entraînement (comprenant 80% du dataset avec les données choisies au hasard) et une rétropropagation toutes les 10 observations. J'ai obtenu une précision de 86,1% sur le jeu d'entraînement.  
Ensuite, en effectuant des prédictions sur le jeu d'entraînement (en appliquant un seuil de 50% aux prédictions pour leur attribuer une classe), la **matrice de confusion m'a indiquée une précision de 86,4% sur de nouvelles observations**.

![ANN](/assets/images/projects/dl/ann.png#center "Réseau de neuronne utilisé")

Par la suite, j'ai cherché à améliorer l'évaluation de mon modèle en implémentant une **Cross-validation** ainsi qu'une recherche des *hyperparamètres* par **Grid-Serach** en jouant sur le nombre d'observations par lots, le nombre de *folds* et de passage du dataset, ou encore le type d'algorithme du gradient stochastic, ce qui m'a permi d'atteindre l'objectif fixé par le cours : dépasser le seuil de **90% de précision sur la généralisation** à de nouvelles observations.
  
<br/>

## 2. Classification d'images : Chiens / Chats
**Convolutionnal Neural Network**

**<ins>Etude de cas :</ins>** On souhaite disposer d'un programme sachant différencier une image montrant un chien d'une image montrant un chat. On dispose pour cela d'un jeu de 10000 images avec une répartition à peu près égale de chiens et de chats.

![CNN](/assets/images/projects/dl/cnn.png#center "Réseau de neuronne à convolution")

Afin d'éviter l'overfitting, j'ai utilisé un procédé appelé "image augmentation" qui consiste en une augmentation artificielle du nombre d'images du jeu d'entrainement en dupliquant les images existantes et en leur appliquant une légère transformation (rotation, redimension, …)  
Après quelques tests en jouant le nombre de couches de convulution/max-pooling, la dimensionnalité (nombre de feature detectors) et la taille des images en entrée. Au mieux, j'ai obtenu une précision de 88.9% sur mon jeu d'entraînement et **79.2% sur le jeu de test**.  
> Je ne suis pas tout à fait sûr des causes du sur-entraînement ici, mais je pense que la différence de taille entre mes images à pu jouer : des très ptites (50x50) et d'autres beauoup plus grandes (2000x1500).
  
<br/>

## 3. Prédiction des tendances de l'action Google
**Recurrent Neural Network : Long Short-Term Memory**

**<ins>Etude de cas :</ins>** À partir de 5 ans d'historique des données boursières de l'action Google, on souhaite prédire les valeurs d'ouverture pour chaque jours du mois de janvier 2017.

Le réseau construit pour ce cas est un RNN de type LSTM avec 3 couches cachées de 64 neurones chacunes et un neurone de sortie. Le RNN utilise un timesteps de 60 jours (on passe les valeurs de 60 jours pour tenter de prédire le jour suivant).  
L'entrainnement s'est fait sur 100 passages du dataset avec 32 observations par lots et en utilisant l'**erreur quadratique moyenne** comme fonction de coût.  
![RNN](/assets/images/projects/dl/rnn.png#center "Réseau de neuronne récurrent")

![Courbe Google](/assets/images/projects/dl/rnn_plot1.png#center "Courbes obtenues")
> Globalement on voit que les prédictions suivent à peu près la tendance réelle (légèrement en retard) et la courbe est plus lisse.
> Ces résultats auraient pu être affinés en utilisant les données d'actions potentiellement corrélées (comme celles des autres *GAFAMI*) ou en augmentant les timesteps

Par la suite, j'ai également tenté de décliner ce modèle afin de **prédire les tendances du prix du Bitcoin** et j'ai obtenu cette courbe :  
![Courbe Bitcoin](/assets/images/projects/dl/rnn_plot2.png#center "Courbes obtenues")
> La courbe de prédiction semble plus proche des valeurs et suit fortement les tendances, cependant ce modèle est sur-entrainné. Dû à un manque de données, les prédictions ont été faites sur des valeurs contenues dans le jeu d'entrainnement (notamment à cause de la valeur de timesteps utilisée). 
> Les résultats étaient beaucoup moins bons lorsque j'ai tenté de faire des prédictions sur le mois suivant.
  
<br/>

## 4. Détection de fraudes
**Modèle hybride, apprentissage non-supervisé puis supervisé : SOM + ANN**

**<ins>Etude de cas :</ins>** Une banque donne un formulaire à remplir à ses clients avant leur vendre un certain type de service. La banque dispose d'un sytème manuel de vérification des des formulaires mais souhaiterai un système automatisé afin de vérifier qu'aucun cas frauduleux ne passe à travers la vérification humaine et qu'aucun cas non-frauduleux soit refusé par erreur. On dispose d'un **dataset anonymisé** (pas de nom de colonne et encodage des réponses) de 700 lignes contenant les réponses aux 15 questions du formulaire.

Ce modèle a été construit en deux parties : 
1. Premièrement, une carte auto-adaptative (SOM ou *Self Organizing Maps*) m'a permi d'étudier la répartition des données dans cet espace à 15 dimensions. En utilisant la **Mean Interneuron Distance** j'ai ensuite été capable d'identifier les valeurs un peu extrèmes ou abérrantes que la banque pourrait considérer comme de la fraude  
![Marked SOM](/assets/images/projects/dl/marked_som.png#center "SOM avec marqueurs du traitement manuel")  
    > Les marqueurs montrent le traitement manuel préalable de la banque : vert = clients acceptés / rouge = clients refusés.  
    > Cela permet de mettre en valeur des cas où le traitement manuel de la banque aurait été défaillant (carré vert sur neurone blanc ou rond rouge sur neurone noir).
    > Dans la carte ci-dessous, les espaces blanc représentent les neurones les plus éloignés des autres : les clients avec des valeurs considérées comme sortant de la normale.  

2. Ensuite, à partir des résultats obtenus précedemment (le fait qu'un client faude ou non) il a été possible de construire un réseaux de neurones afin de fournir à la banque une liste ordonnée indiquant la probabilité qu'un client fraude pour tout le dataset. Cet ANN se composait d'une couche cachée et d'un neurone de sortie et a été entrainné en utilisant la fonction de coût logistique.  

Ici, la taille du dataset a été problématique car n'ayant détecté que peu de cas frauduleux, les prédictions ont été faites sur les données d'entraînement (pas de séparation possible). Il en a résulté de grandes probabilités sur les clients déja identifiés comme fraudeurs et de beaucoup plus petites nuances sur les valeurs des autres clients.