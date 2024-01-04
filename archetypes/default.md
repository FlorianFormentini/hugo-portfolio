---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
hero: /images/heros/ai-hero.jpg
author:
    name: {{ .Site.Data.author.name }}
    image: {{ .Site.Data.author.image }}
menu:
  sidebar:
    name: "{{ replace .Name "-" " " | title }}"
    identifier: "{{ replace .Name "-" " " | title }}"
    # parent: projets
    # weight: 

draft: true
---

