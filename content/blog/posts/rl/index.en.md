---
title: "Uncovering and Mastering the Foundations of Reinforcement Learning"
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

My venture into reinforcement learning (RL) was sparked by the captivating desire to train artificial intelligences to excel in the playful realm of video games. The dedicated [course by Hugging Face](https://huggingface.co/learn/deep-rl-course/unit0/introduction) served as the starting point for my exploration, guiding me through a diverse array of techniques, from fundamentals like Markov Decision Processes (MDP) to Deep Q-learning, all while delving into multi-agent systems or tools like Unity ML-Agents

{{< vs 2 >}}

## Diving into Fundamentals: Markov Decision Processes (MDP)
My journey commenced with grasping the theoretical foundations of reinforcement learning, focusing on MDPs. These models provided the necessary mathematical framework to understand decision-making in dynamic and uncertain environments, laying the groundwork for reinforcement learning.

{{< vs 3 >}}

## Q-learning: The Art of Learning through Experience
The course guided me through **Q-learning**, an essential technique where an agent learns to make optimal decisions by actively exploring its environment.

{{< video src="https://huggingface.co/Flooow/q-Taxi-v3/resolve/main/replay.mp4" >}}
> - Le [problème du taxi](https://gymnasium.farama.org/environments/toy_text/taxi/ "Doc Gymnasium - Taxi") consiste à naviguer vers des passagers dans un monde quadrillé, à les prendre et à les déposer à l'un des quatre endroits proposés.
> - [Model repository](https://huggingface.co/Flooow/q-Taxi-v3)

{{< vs 3 >}}

## Depth with Deep Q-learning
Advancing through the course, I discovered the possibilities of **Deep Q-learning**, integrating deep neural networks to tackle increasingly complex environments, especially relevant for video games.

{{< video src="https://huggingface.co/Flooow/dqn-SpaceInvadersNoFrameskip-v4/resolve/main/replay.mp4" >}}
> - Trained with [StableBaseline3](https://github.com/DLR-RM/stable-baselines3) et [RL Zoo](https://github.com/DLR-RM/rl-baselines3-zoo)
> - [Model repository](https://huggingface.co/Flooow/dqn-SpaceInvadersNoFrameskip-v4)

{{< vs 3 >}}

## Towards Actor-Critic (A2C): Balancing Action and Evaluation
The course then explored advanced methods such as **Actor-Critic** (A2C), where the agent is split into two distinct roles: the actor making decisions and the critic evaluating these choices, providing a more stable approach to reinforcement learning.

{{< video src="https://huggingface.co/Flooow/a2c-AntBulletEnv-v0/resolve/main/replay.mp4" >}}
> - [Model repository](https://huggingface.co/Flooow/a2c-AntBulletEnv-v0)

{{< vs 3 >}}

## Policy Proximity: Proximal Policy Optimization (PPO)
The course also introduced **Proximal Policy Optimization** (PPO), a policy-based method that gradually adjusts action policies, a robust approach to training agents in complex environments, a key skill for mastering video games.

{{< video src="https://huggingface.co/Flooow/ppo-LunarLander-v2/resolve/main/replay.mp4" >}}
> - [Model repository](https://huggingface.co/Flooow/ppo-LunarLander-v2)

{{< vs 3 >}}


## Exploring Multi-Agent Systems
The real world often consists of entities interacting with each other. Thus, the Hugging Face course introduced me to multi-agent systems, an extension of reinforcement learning that considers complex interactions between multiple autonomous agents.

{{< vs 3 >}}

## Conclusion

{{< video src="https://huggingface.co/Flooow/samplefactory-vizdoom-hgs/resolve/main/replay.mp4" >}}
> - The goal was to search and obtain health packs
> - [Model repository](https://huggingface.co/Flooow/samplefactory-vizdoom-hgs)

{{< vs 2 >}}

Thanks to the [Hugging Face course on reinforcement learning](https://huggingface.co/learn/deep-rl-course/unit0/introduction), I not only gained a profound understanding of fundamental concepts but also explored advanced methods that enriched my perspective on this exciting discipline. My learning journey was both stimulating and rewarding, equipping me with the skills needed to confidently tackle the challenges of training AI in the dynamic realm of video games through reinforcement learning.

All the models trained in the course and many others are available on [my HuggingFace profile](https://huggingface.co/Flooow).

{{< vs 2 >}}
{{< img src="certifimage.png" align="center" height="500" title="Certification" >}}
{{< vs 2 >}}
