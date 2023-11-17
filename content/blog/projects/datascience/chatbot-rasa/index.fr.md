---
title: Chatbot FAQ Rasa
date: 2022-06-10
# hero: 
menu:
  sidebar:
    name: Chatbot Rasa
    identifier: chatbot-rasa
    parent: datascience
    # weight: 1
isProject: true
draft: false
---

Conception d'un chatbot médical pour une application de suivi de la grossesse.  
Durée du projet: 18 mois

**Fonctionnalités attendues:** 
- Répondre à des questions sur la grossesse de la manière d'une sage-femme
- Extraire des données de documents médicaux
- Fluidifier certains echanges avec les utilisatrices

L'objetif final étant de remplacer le système de conversations en place, basé sur des conditions, qui devenait de plus en plus difficile à maintenir et faire évoluer.


## Gestion du projet
Ce projet s'est déroulé en trois phases distinctes:
1. Recherches sur les méthodes de compréhension et traitement de texte (NLU/NLP) et tests de différents types de modèles
2. Développement d'une API Flask pour tester différentes approches hors de l'application, sur Facebook et Télégram
3. Conception d'un chatbot avec le framework RASA et d'un dashboard de monitoring de son utilisation dans Google Colab

**Outils**:
- Python : Google Colab, Flask, Tensorflow, scikit-learn, RASA, openCV
- PostgreSQL, MongoDB
- API externes : Facebook, Télégram, AWS, GCP
- Ubuntu, Docker, Certbot
- CI/CD: GitHub, DockerHub



### 1. Recherches NLU/NLP
Les recherches ont débuté par les bases du traitement du texte avec les méthodes de nettoyage et d'analyses de corpus: 
- stopwords
- lemmatization
- stemming
- Part-of-speech tagging
- Named-Entity Recognition
- Sentiment analysis

Ainsi que les méthodes de vectorisation de texte:
- Bag-of-words
- Tf-idf
- Words Embedding

Plusieurs prototypes de chatbot ont ensuite été développés et testés, en se basant sur différents types de modèles:
- Classification multiple: Deep Neural Network
- Moteur d'inférence
- Question-Answering: End-To-End Memory Network, BERT



### 2. API Flask
Afin de tester ces différents prototypes sur un panel réduit d'utilisateurs, une API flask a été construite pour rendre accessibles les modèles entrainés. Cette dernière a ensuite été connectée à une page Facebook ainsi qu'à un bot Télégram avec des webhooks.

Des QR codes ont été affichés dans le cabinet d'une sage-femme partenaire dans le but de proposer les chatbots à ses patientes.

{{< img src="images/API_scheme.png" align="center" height="500" title="Schéma API" >}}
> CI/CD via GitHub
> Déployée sur [Heroku](https://www.heroku.com/)



### 3. Chatbot RASA
La découverte du [framework RASA](https://rasa.com) a été faite en cherchant des librairies de code spécialisée en NLU/NLP pour faciliter les tests. Après quelques essais sur la configuration et l'optimisation des modèles, il a été possible de construire un chatbot conversationnel plus performant que tous les autres prototypes développés avec lequel il a été possible de couvrir tous les besoins du projet.
- Pipelines de traitements personnalisables intégrant des modèles state-of-the-art
- Apprentissage intéractif
- Automatisation de l'entrainnement des modèles sans impacter le chatbot en production
- Possibilité d'intégrer facilement des services tiers 
- Des connecteurs simplifiés pour un déploiement facile sur de nombreuses plateformes

Ce qui a permis d'implémenter très simplement plusieurs boucles de conversations, dont une pour gérer les messages incompris, ainsi qu'une partie FAQ médicale de plus de 120 questions/réponses sur le grossesse.

Le chatbot a ensuite été déployé sur un VPN OVH dans un système dockerizé multi-container comprenant aussi:
- UI de gestion du chatbot RASA X : Pour la gestion des données, des conversations, l'entrainnment des modèles et le suivi des messages recus
- Base de données postgreSQL et redis
- Container pour ré-entrainer les modèles sans impacter ceux en production
- Nginx avec un script de renouvellement auto du certificat SSL
- CI/CD automatisé avec Github et DockerHub

Enfin, un notebook colab a été utilisé pour créer des graphiques de suivi de plusieurs indicateurs sur l'utilisation du chatbot et des feed-back recus.

{{< img src="images/system_scheme.png" align="center" height="500" title="Système RASA complet" >}}

Après la mise en place d'un processus de maintenance (notamment pour l'intégration de nouvelles questions/reponses), de nouvelles recherches ont débutés pour ajouter au chatbot la possibilité d'extraire des données de documents médicaux qui lui seraient transmis (images ou pdf), avec plusieurs services existants: AWS Textract, Google Cloud Vision, Tesseract, ...


