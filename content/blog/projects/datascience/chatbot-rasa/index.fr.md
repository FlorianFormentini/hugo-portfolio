---
title: Chatbot FAQ Rasa
date: 2022-06-10
# hero: 
menu:
  sidebar:
    name: Chatbot Médical
    identifier: chatbot-rasa
    parent: datascience
    # weight: 1
isProject: true
draft: false
---

Conception d'un chatbot médical pour une application de suivi de la grossesse.  
Durée du projet: 18 mois
<!--more-->

**Fonctionnalités attendues:** 
- Répondre à des questions sur la grossesse de la manière d'une sage-femme
- Extraire des données de documents médicaux
- Fluidifier certains echanges avec les utilisatrices

L'objetif final étant de remplacer le système de conversations en place, basé sur des conditions, qui devenait de plus en plus difficile à maintenir et faire évoluer.


## 1. Gestion du projet
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


{{< vs 2 >}}

## 2. Recherches NLU/NLP
Les recherches ont débuté par les bases du traitement du texte avec les méthodes de nettoyage et d'analyses de corpus:
- Stemming / lemmatization
- N-grams
- Part-of-Speech tagging
- Named-Entity Recognition
- Sentiment analysis

Ainsi que les méthodes de vectorisation de texte:
- Bag-of-words
- Tf-idf
- Words Embedding

Plusieurs prototypes de chatbot ont ensuite été développés et testés, en se basant sur différents types de modèles:
- Classification multiple: Deep Neural Network
- Moteur d'inférence (inférence bayésienne)
- Question-Answering: End-To-End Memory Network, BERT


{{< vs 2 >}}

## 3. API Flask
Afin de tester ces différents prototypes sur un panel réduit d'utilisateurs, une API flask a été construite pour rendre accessibles les modèles entrainés.  
Cette dernière a ensuite été connectée à une page Facebook ainsi qu'à un bot Télégram avec des webhooks.

Des QR codes ont été affichés dans le cabinet d'une sage-femme partenaire dans le but de proposer les chatbots à ses patientes.

{{< img src="images/API_scheme.png" align="center" height="500" title="Schéma API" >}}
> Déployée sur [Heroku](https://www.heroku.com/)
> CI/CD automatisés via GitHub


{{< vs 2 >}}

## 4. Chatbot RASA
La découverte du [framework RASA](https://rasa.com) a été faite en cherchant des librairies de code spécialisée en NLU/NLP pour faciliter les tests. Après quelques essais sur la configuration et l'optimisation des modèles, il a été possible de construire un chatbot conversationnel plus performant que tous les autres prototypes développés:
- Pipelines NLU/NLP personnalisables intégrant des modèles state-of-the-art
- Apprentissage intéractif
- Automatisation de l'entrainnement des modèles sans impacter le chatbot en production
- Possibilité d'intégrer facilement des services tiers 
- Des connecteurs simplifiés pour un déploiement facile sur de nombreuses plateformes

Ce qui a permis d'implémenter très simplement plusieurs boucles de conversations, ainsi qu'une partie FAQ médicale de plus de 120 questions/réponses sur le grossesse, qiu couvrait la majeur partie des besoins initiaux.

Le chatbot a ensuite été déployé sur un VPN OVH dans un système dockerizé multi-container:
- Les modèles de production du chatbot
- L'UI de gestion du chatbot RASA X : Pour la gestion des données, des conversations, l'entrainnment des modèles et le suivi des messages recus
- Bases de données postgreSQL et redis
- Un container pour ré-entrainer les modèles sans impacter ceux en production
- Nginx avec un script de renouvellement auto du certificat SSL
- CI/CD automatisé avec Github et DockerHub


{{< img src="images/system_scheme.png" align="center" height="500" title="Système RASA complet" >}}


{{< vs 1 >}}

### Tests et support
Les premiers tests sur des utilisateurs réels se sont faits avec un bot Télégram avant une intégration définitive dans l'application de l'entreprise.  
Des indicateurs de performances ont été définis, et des graphiques ont été créés dans un notebook Google Colab pour suivre leur évolution ainsi que les feed-backs reçus.

Il a ensuite rapidement fallu mettre en place un processus de maintenance, d'une part pour alimenter les données d'entrainnement avec les messages reçus afin d'affiner la détection d'intentions. Et d'autre part pour pouvoir ajouter de nouvelles questions/réponses à la partie FAQ.


{{< vs 1 >}}

### Évolutions prévues

L'intégration du chatbot à l'application a été préparée en reproduisant les échanges existants dans celle-ci, tout en prévoyant l'utilisation de données utilisateurs accessibles dans la construction des réponses.

Cependant  des problèmes extérieurs au projet ont grandement répoussés l'échéance et je n'ai malheureusement pas pu assister à sa mise en place définitive.

De nouvelles recherches ont alors débutées pour ajouter la possibilité d'extraire des données de documents médicaux qui seraient transmis au chatbot (images ou pdf). Notamment en testsant plusieurs services existants: AWS Textract, Google Cloud Vision, Tesseract, ...

