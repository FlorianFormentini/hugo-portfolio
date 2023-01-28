---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
hero: /images/heros/ai-hero.jpg
menu:
  sidebar:
    name: "{{ replace .Name "-" " " | title }}"
    identifier: "{{ replace .Name "-" " " | title }}"
    # parent: projets
    # weight: 

draft: true
---

