---
title: "Découverte et Maîtrise des Fondements de l'Apprentissage par Renforcement"
# hero: /assets/images/heros/ai-hero.jpg
date: 2023-10-01
menu:
  sidebar:
    name: Reinforcement Learning
    identifier: rl
    parent: posts
    # weight: 10
isProject: true
---
{{< vs 2 >}}

L'apprentissage par renforcement (RL) est une branche fascinante de l'intelligence artificielle qui vise à enseigner à un agent comment prendre des décisions pour maximiser une récompense cumulative dans un environnement donné.   

Mon voyage dans le monde de l'apprentissage par renforcement a débuté par l'envie d'entrainer des IA à jouer à des jeux vidéos (notamment Track Mania). 

Le [cours proposé par HuggingFace](https://huggingface.co/learn/deep-rl-course/unit0/introduction), qui m'a ouvert les portes d'un ensemble diversifié de techniques et d'approches, allant des fondamentaux tels que les Processus de Décision Markoviens (MDP) jusqu'à des concepts plus récents et évoluées, en passant par les systèmes multi-agents ou des outils comme Unity ML-Agents.

{{< vs 2 >}}

## Plongée dans les Fondamentaux : Markov Decision Processes
Mon parcours a débuté avec la compréhension des bases théoriques de l'apprentissage par renforcement, en mettant l'accent sur les **MDP**. Ces modèles ont établi le socle mathématique nécessaire pour comprendre les prises de décision dans des environnements dynamiques et incertains, constituant ainsi la fondation de l'apprentissage par renforcement.

{{< vs 3 >}}

## Q-learning : L'Art d'Apprendre par l'Expérience
Le cours m'a guidé à travers le **Q-learning**, une technique fondamentale dans laquelle un agent apprend à prendre des décisions optimales en explorant son environnement. La méthode Q-learning m'a permis de comprendre comment les agents peuvent apprendre à maximiser les récompenses à long terme en évaluant et en exploitant différentes actions possibles.

{{< video src="https://huggingface.co/Flooow/q-Taxi-v3/resolve/main/replay.mp4" >}}
> - Le [problème du taxi](https://gymnasium.farama.org/environments/toy_text/taxi/ "Doc Gymnasium - Taxi") consiste à naviguer vers des passagers dans un monde quadrillé, à les prendre et à les déposer à l'un des quatre endroits proposés.
> - [Repository du modèle](https://huggingface.co/Flooow/q-Taxi-v3)

{{< vs 3 >}}

## Profondeur avec le Deep Q-learning
En progressant dans le cours, j'ai découvert le potentiel du **Deep Q-learning**. Cette extension du Q-learning intègre des réseaux de neurones profonds pour traiter des environnements plus complexes et non linéaires. Cette approche m'a permis d'explorer des applications plus avancées dans des domaines tels que les jeux vidéo et la robotique.

{{< video src="https://huggingface.co/Flooow/dqn-SpaceInvadersNoFrameskip-v4/resolve/main/replay.mp4" >}}
> - Entrainé grâce à [StableBaseline3](https://github.com/DLR-RM/stable-baselines3) et [RL Zoo](https://github.com/DLR-RM/rl-baselines3-zoo)
> - [Repository du modèle](https://huggingface.co/Flooow/dqn-SpaceInvadersNoFrameskip-v4)

{{< vs 3 >}}

## Vers l'Actor-Critic (A2C) : Équilibrer l'Action et l'Évaluation
Le cours a ensuite abordé des méthodes plus sophistiquées telles que l'**Actor-Critic** (A2C) et le Proximal Policy Optimization (PPO). Cette approche combine l'idée de l'acteur prenant des décisions et du critique évaluant ces décisions, offrant une meilleure stabilité et efficacité dans l'apprentissage par renforcement.

{{< video src="https://huggingface.co/Flooow/a2c-AntBulletEnv-v0/resolve/main/replay.mp4" >}}
> - [Repository du modèle](https://huggingface.co/Flooow/a2c-AntBulletEnv-v0)

{{< vs 3 >}}

## Proximal Policy Optimization (PPO)
Le cours a également introduit le **Proximal Policy Optimization** (PPO), une méthode basée sur la politique qui ajuste progressivement les politiques d'action pour améliorer l'apprentissage sans perturber de manière significative les stratégies existantes. Cette approche offre une alternative robuste pour entraîner des agents dans des environnements complexes.

{{< video src="https://huggingface.co/Flooow/ppo-LunarLander-v2/resolve/main/replay.mp4" >}}
> - [Repository du modèle](https://huggingface.co/Flooow/ppo-LunarLander-v2)


{{< vs 3 >}}


## Exploration des Systèmes Multi-Agents
Le monde réel est souvent composé d'entités interagissant les unes avec les autres. C'est pourquoi le cours HuggingFace m'a introduit aux systèmes multi-agents, une extension de l'apprentissage par renforcement qui prend en compte les interactions complexes entre plusieurs agents autonomes.

{{< vs 3 >}}

## Conclusion

{{< img src="certifimage.png" align="center" height="500" title="Certification" >}}

Grâce au [cours HuggingFace](https://huggingface.co/learn/deep-rl-course/unit0/introduction) sur l'apprentissage par renforcement, j'ai non seulement acquis une compréhension approfondie des concepts fondamentaux, mais j'ai également exploré des méthodes avancées qui enrichissent ma perspective sur cette discipline passionnante, tout en pouvant tester ces diférents algorithmes sur des exercices intéréssants et ludiques. Ce cours m'a ainsi offert les compétences nécessaires pour aborder des problèmes du monde réel avec confiance, je le recommande donc vivement !

Tous les modèles entrainés dans le cadre du cours et d'autres encores sont disponibles sur [mon profil HuggingFace](https://huggingface.co/Flooow).


<!-- video doom -->

{{< video src="https://huggingface.co/Flooow/samplefactory-vizdoom-hgs" >}}
> - Le but était de chercher et récupérer les packs de soins
> - [Repository du modèle](https://huggingface.co/Flooow/samplefactory-vizdoom-hgs)

{{< vs 2 >}}

