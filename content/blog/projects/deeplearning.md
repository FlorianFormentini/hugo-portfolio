---
title: "Projets Deep Learning"
date: 2020-07-02T19:07:32+02:00
hero: /images/heros/ai-hero.jpg
menu:
  sidebar:
    name: Deep Learning
    identifier: projets-test-dl
    parent: projects
    # weight: 12
isProject: true
---

Lors de mon apprentissage des concepts de différents modèles de Deep Learning j'ai eu l'occasion de les implémenter dans diverses études de cas dont certaines, plus concrêtes, ont retenues mon attention.

## 1. Diminution du taux d'attrition d'une banque

Une banque a remarqué une hausse de son taux d'attrition et souhaite donc identifier le segment de sa clientèle le plus susceptible de partir vers la concurrence pour lancer une campagne marketing ciblée.  
Pour cela elle fourni un jeu de données anonymisées de sa base de clients contenant une variable qui indique si la personne est toujours un client de la banque.  
Pour que la banque puisse utiliser les prédictions obtenues, celles-ci doivent dépasser une précision (accuracy) de 90%.

Après quelques opérations de préparation des données, un réseau de neurones de types "feed-forward" composé de 2 couches cachées complètement connectées a été entraîné.
L'entraînement du modèle s'est fait en utilisant la fonction de cout logistique (*binary cross entropy*) sur 80% des données sélectionnées aléatoirement.

![ANN](/assets/images/projects/dl/ann.png#center "Réseau de neuronne utilisé")

Par la suite, le modèle a été optimisé par **Grid-Serach** avec une **Cross-validation**, mais aussi en ajustant le seuil de décision. Ce qui m'a permi d'atteindre l'objectif dépasser le seuil de **90% de précision sur la généralisation** à de nouvelles observations.
  
{{< vs 3 >}}

## 2. Classification binaire d'images (Chiens / Chats) avec un réseau convolutionnel

On souhaite disposer d'un programme sachant différencier une image montrant un chien d'une image montrant un chat. On dispose pour cela d'un jeu de 10000 images avec une répartition à peu près égale de chiens et de chats.

![CNN](/assets/images/projects/dl/cnn.png#center "Réseau de neuronne à convolution")

Afin d'éviter l'overfitting, j'ai utilisé un procédé appelé "image augmentation" qui consiste en une augmentation artificielle du nombre d'images du jeu d'entrainement en dupliquant les images existantes et en leur appliquant une légère transformation (rotation, redimension, …)  
Après quelques tests en jouant le nombre de couches de convulution/max-pooling, la dimensionnalité (nombre de feature detectors) et la taille des images en entrée. Au mieux, j'ai obtenu une précision de 88.9% sur mon jeu d'entraînement et **79.2% sur le jeu de test**.  
> Je ne suis pas tout à fait sûr des causes du sur-entraînement ici, mais je pense que la différence de taille entre mes images à pu jouer : des très ptites (50x50) et d'autres beauoup plus grandes (2000x1500).
  
{{< vs 3 >}}

## 3. Prédiction de l'action Google par LSTM

À partir de 5 ans d'historique des données boursières de l'action Google, on souhaite prédire les valeurs d'ouverture pour chaque jours du mois de janvier 2017.

Le réseau construit est un RNN de type LSTM avec 3 couches cachées de 64 neurones chacunes et un neurone de sortie. Le RNN utilise un timesteps de 60 jours (on passe les valeurs de 60 jours pour tenter de prédire le jour suivant).  
L'entrainnement s'est fait sur 100 passages du dataset avec 32 observations par lots et en utilisant l'**erreur quadratique moyenne** comme fonction de coût.  
![RNN](/assets/images/projects/dl/rnn.png#center "Réseau de neuronne récurrent")

![Courbe Google](/assets/images/projects/dl/rnn_plot1.png#center "Courbes obtenues")
> Globalement on voit que les prédictions suivent à peu près la tendance réelle (légèrement en retard) et la courbe est plus lisse.
> Ces résultats auraient pu être affinés en utilisant les données d'actions potentiellement corrélées (comme celles des autres *GAFAMI*) ou en augmentant les timesteps

Par la suite, j'ai également tenté de décliner ce modèle afin de **prédire les tendances du prix du Bitcoin** et j'ai obtenu cette courbe :  
![Courbe Bitcoin](/assets/images/projects/dl/rnn_plot2.png#center "Courbes obtenues")
> La courbe de prédiction semble plus proche des valeurs et suit fortement les tendances, cependant ce modèle est sur-entrainné. Dû à un manque de données, les prédictions ont été faites sur des valeurs contenues dans le jeu d'entrainnement (notamment à cause de la valeur de timesteps utilisée). 
> Les résultats étaient beaucoup moins bons lorsque j'ai tenté de faire des prédictions sur le mois suivant.
  
{{< vs 3 >}}

## 4. Système de détection de fraudes
**Modèle hybride, apprentissage non-supervisé puis supervisé : SOM + ANN**

Une banque met en place un formulaire pour souscrire à une de leurs offres. Cette banque utilise une vérification manuelle des formulaires mais souhaiterai un système automatisé afin de vérifier qu'aucun cas frauduleux ne passe à travers la vérification humaine et qu'aucun cas non-frauduleux soit refusé par erreur.   
Pour cela, elle met à disposition un **dataset anonymisé** contenant les réponses aux questions du formulaire de plusieurs centaines de clients.

Le modèle permettant la étection de fraude a été construit en deux parties : 
1. Premièrement, une carte auto-adaptative (*Self Organizing Maps*) permet d'étudier la répartition des données. En utilisant la **Mean Interneuron Distance** il est possible d'identifier les valeurs un peu extrèmes ou abérrantes que la banque pourrait considérer comme de la fraude  
    ![Marked SOM](/assets/images/projects/dl/marked_som.png#center "SOM avec marqueurs du traitement manuel")  
    > - Les espaces blanc représentent les neurones les plus éloignés des autres : les clients avec des valeurs considérées comme *anormales*.  
    > - Les marqueurs montrent le traitement manuel préalable de la banque : vert = clients acceptés / rouge = clients refusés.  
        Cela permet de mettre en valeur des cas où le traitement manuel de la banque aurait été défaillant (carré vert sur neurone blanc ou rond rouge sur neurone noir).  
2. Ensuite, à partir des résultats obtenus précedemment, il a été possible de construire un réseaux de neurones qui prédit la probabilité qu'un client fraude sur ce formulaire.

Ici, la taille du dataset a été problématique car n'ayant détecté que peu de cas frauduleux, les prédictions ont été faites sur les données d'entraînement (pas de séparation possible). Il en a résulté de grandes probabilités sur les clients déja identifiés comme fraudeurs et de beaucoup plus petites nuances sur les valeurs des autres clients.