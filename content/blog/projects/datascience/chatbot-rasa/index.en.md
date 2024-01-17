---
title: Chatbot FAQ Rasa
date: 2022-06-10
hero: images/hero.avif
menu:
  sidebar:
    name: Chatbot Médical
    identifier: chatbot-rasa
    parent: datascience
    # weight: 1
isProject: true
draft: true
---

Discovery of NLU/NLP concepts and design of a medical chatbot for a pregnancy monitoring application.  
**Project duration**: 18 months
<!--more-->

This project was realized as part of my work-study contract for my Master's degree.

**Expected features:**  
- Answer questions about pregnancy in a midwifery way
- Extract data from medical documents
- Facilitate some exchanges with users

The goal was to replace the existing condition-based conversation system, which was becoming increasingly difficult to maintain and evolve.


## 1. project management
This project was divided into three distinct phases:
1. Learning NLU/NLP methods and testing of different types of models.
2. Development of a Flask API to test different solutions outside the main application with Facebook and Telegram
3. Design of a chatbot using the RASA framework and a dashboard in Google Colab to monitor it.

**Tools**:
- Python : Google Colab, Flask, Tensorflow, scikit-learn, RASA, openCV
- PostgreSQL, MongoDB
- External APIs : Facebook, Télégram, AWS, GCP
- Ubuntu, Docker, Certbot
- CI/CD: GitHub, DockerHub


{{< vs 2 >}}

## 2. NLU/NLP
The research began with the basics of text processing, with corpus cleaning and analysis methods:
- Stemming / lemmatization / N-grams
- Part-of-Speech tagging
- Named-Entity Recognition
- Sentiment analysis

As well as text vectorization methods:
- Bag-of-words
- Tf-idf
- Words Embedding

Several chatbot prototypes were then developed and tested, based on different types of models:
- Multiple classification: Deep Neural Network
- Inference engine (Bayesian inference)
- Question-Answering: End-To-End Memory Network, BERT


{{< vs 2 >}}

## 3. Flask API 
In order to test these different prototypes on a reduced panel of users, a Flask API was built to make the trained models accessible.  
This was then connected to a Facebook page and a Telegram bot with webhooks.

QR codes were displayed in a partner midwife's practice to offer chatbots to her patients.

{{< img src="images/API_scheme.png" align="center" height="500" title="Schéma API" >}}
> Deployed on [Heroku](https://www.heroku.com/)
> Automated CI/CD via GitHub


{{< vs 2 >}}

## 4. RASA Chatbot
The discovery of the [RASA framework](https://rasa.com) was made while searching for specialized NLU/NLP code libraries to explore other methods and models.  
After a few tests on model configuration and optimization, it was possible to build a conversational chatbot that outperformed all the other prototypes developed:
- Customizable NLU/NLP pipelines with state-of-the-art models
- Interactive learning and training automation
- Downtime of just a few seconds when changing model
- Easy integration of third-party services to pre/post-process messages or influence the direction of a conversation.
- Simplified connectors for easy deployment on numerous platforms

{{< img src="images/models.avif" align="center" height="550" title="Rasa ML Pipeline" >}}
> Chatbot model pipeline

**This resulted in the implementation of several conversation loops, as well as a medical FAQ section with over 120 questions/answers on pregnancy, covering most of the initial needs.**

The chatbot was then deployed on an OVH VPN with CI/CD automated via Github, in a system of Docker containers:
- Chatbot production models
- RASA X chatbot management UI: for data and conversation management, model training and messages monitoring
- PostgreSQL and Redis databases
- A container for training models without impacting production models
- Nginx with SSL certificate auto-renewal script


{{< img src="images/system_scheme.png" align="center" height="550" title="Système RASA complet" >}}


{{< vs 1 >}}

### Tests et support
The first tests on real users were carried out with a Telegram bot, before definitive integration into the company's application.  
Performance indicators were defined, and graphs were created in a Google Colab notebook to track progress and feedback.

We quickly had to set up a maintenance process. Firstly, to clean up the incoming messages and feed them into the training set, in order to improve the detection of intents. And secondly, to decide which new questions/answers to add in the FAQ section, and how to do so without disrupting the response to existing questions.


{{< vs 1 >}}

### Planned changes

The integration of the chatbot into the company's application was prepared by reproducing existing interactions, while also making it possible to use accessible user data in the construction of responses.

However, problems external to the project greatly postponed the deadline, and I was unfortunately unable to attend the final installation.

Before the end of my contract, in parallel with finalizing the documentation needed to pass on the project, new research began to add the possibility of extracting data from medical documents that would be transmitted to the chatbot (images or pdf). We tested several existing services: AWS Textract, Google Cloud Vision, Tesseract, ... but the wide variety of formalism in these documents made the task very challenging.

{{< vs 2 >}}
