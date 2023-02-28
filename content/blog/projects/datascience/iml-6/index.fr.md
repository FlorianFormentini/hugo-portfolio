---
title: Classification d'images
date: 2021-07-28
hero: img/hero.png
menu:
  sidebar:
    name: Classification images
    identifier: iml-6
    parent: datascience
math: true
isProject: true
---

La base de données d'un chenil local s'agrandit de plus en plus et les bénévoles n'ont pas toujours le temps de référencer les images accumulées depuis plusieurs années. Un algorithme capable de classer les images en fonction de la race du chien présent dessus leur permettrait un gain de temps considérable.

Ce projet faisait partie de la formation bac+5 Ingénieur Machine Learning.

<!-- {{< vs 1 >}}
{{< githublink "FlorianFormentini/OC_IML_P6_Images" >}} -->

**Durée du projet:** 60 heures

**Mes missions:**
- Réaliser un algorithme de détection de la race du chien sur une photo
- Comparer un réseau CNN manuel à un modèle utilisant le [*Transfer Learning*](https://fr.wikipedia.org/wiki/Apprentissage_par_transfert) en termes de temps de traitement et de résultats

## Données
Les bénévoles n'ont pas le temps de réunir les images de leurs pensionnaires. Les modèles ont donc été entraînés avec le [Stanford Dogs Dataset](http://vision.stanford.edu/aditya86/ImageNetDogs/), qui contient des images de chiens de 120 races différentes avec plus de 150 images par race.

Pour gagner en temps de traitement, uniquement 10 classes ont été conservées.

### Préparation
- [*Whitening transformation*](https://en.wikipedia.org/wiki/Whitening_transformation)
- [*Histogram equalization*](https://en.wikipedia.org/wiki/Histogram_equalization)
- Réduction de la taille des images à 128*128
- **Data Augmentation**: Application de diverses transformations sur les images (rotation, zoom, *mirroring*) pour en augmenter artificiellement le nombre.

La distinction entre les erreurs de type I et II n'est pas importante alors les modèles ont été évalués uniquement selon leur précision (*accuracy*).
$$Accuracy = {{correct \space classifications} \over {all \space classifications}}$$

{{< vs 2 >}}

## CNN "from scratch"
{{< img src="img/cnn_fromScratch.png" align="center" height="250" >}}
> - Deux blocs Convolution(3\*3) + Pooling(2\*2)
> - Une couche de flattening
> - Une couche complètement connectée à 256 neurones
> - La couche de sorties à 10 neurones

Ce modèle n’a pas fourni de très bonnes performances avec 35% de bonnes réponses sur le jeu d’entrainement, 31% sur le jeu de validation et 27% sur le jeu de tests. 

<!-- {{< img src="img/cm_custom.png" align="center"  height="300" >}} -->

{{< vs 2 >}}

## Transfer Learning

Plusieurs modèles de Transfer Learning ont été comparés:
- [VGG16](https://arxiv.org/abs/1409.1556v6)
- [RESNET50](https://towardsdatascience.com/the-annotated-resnet-50-a6c536034758)
- [InceptionV3](https://cloud.google.com/tpu/docs/inception-v3-advanced?hl=fr)

<!-- {{< img src="img/cm_tl.png" align="center"  height="300" >}} -->
{{< img src="img/TLcomparisons.png" align="center"  height="300" >}}
> La modèle InceptionV3 obtient plus de 90% de classifications correctes. C'est donc ce modèle qui a été sélectionné et optimisé.

{{< img src="img/inceptionV3.png" align="center" height="300" >}}

{{< vs 1 >}}

Après une opération de [*Fine-Tuning*](https://keras.io/api/applications/#finetune-inceptionv3-on-a-new-set-of-classes) le modèle obtient plus 93% de bonnes réponses pour 10 classes.

La procédure n'étant pas trop gourmande en ressources, elle a ensuite été recommencée en utilisant cette fois les 120 classes d'images disponibles.  
Le modèle a alors obtenu **79%** de bonnes réponses ce qui a été considéré comme acceptable par l'association pour un premier étiquetage.

## Déploiement

Le modèle fine-tuné ainsi que le pipeline de pré-traitements ont été associés à un script python pour faciliter leur utilisation.

```sh
> python P6_02_script.py -i <img_path> [-m <model_path>] [--debug]
```
- `-i` : chemin d'une image unique ou d'un dossier d'images
- `-m` (optionnel): chemin du modèle
- `--debug` (optionnel): affichage d'informations supplémentaires
