---
layout: default
title: Software
---


We are interested in developing bioinformatics technologies and practicing evidence-based medicine.
Here, we develop bioinformatic software about biological system, and applying them to RNA biology and Precision Medicine.

**Table of Contents:**

* [01 RNAfinder](#01)
* [02 RNAtarget](#02)
* [03 RNAstructurome](#03)
* [04 RNAmed](#04)

> [Lu Lab's **Github**](https://github.com/lulab)

---

# 01
## RNAfinder

[**Ribowave**](https://lulab.github.io/Ribowave)

> Zhiyu Xu, Long Hu, et al. Nucleic Acids Research (2018)

Github: https://github.com/lulab/Ribowave


RiboWave analyses Ribosome profiling data (Ribo-seq). It utilizes wavelet transform to denoise the original signal by extracting 3-nt periodicity of ribosomes (i.e. signal frequency) and precisely locate their footprint.

[**COME**](https://github.com/lulab/COME)

> Long Hu, et al. Nucleic Acids Research (2017)

Github: https://github.com/lulab/COME

COME is a tool to calculate COding potential from Multiple fEatures for a given transcript. The models in COME were trained on mRNAs and long ncRNAs (lncRNAs).

[**RNAfeature**](http://Rnafeature.ncrnalab.org)

Github: https://github.com/lulab/RNAfinder  \|  https://github.com/lulab/RNAfeature

> Long Hu, et al. Nucleic Acids Research (2015)

RNAfeature provides a common set of conserved features for ncRNAs across multiple species. The models in RNAfeature were trained on canonical ncRNAs (e.g.,tRNAs,rRNAs, miRNAs, snRNAs, snoRNAs, 7SK RNAs, Y RNAs).

# 02
## RNAtarget

[**RBPgroup**](http://RNAtarget.ncrnalab.org/RBPgroup)

> Yang Eric Li, Mu Xiao, Binbin Shi, Yu-Cheng T. Yang, et al. Genome Biology (2017)

Github: https://github.com/lulab/RBPgroup

RBPgroup is a soft-clustering method on various CLIP-seq datasets, in order to group together RBPs that specifically bind the same RNA sites. Our approach links proteins and RNA motifs known to possess similar biochemical and cellular properties and can, when used in conjunction with additional experimental data, identify high- confidence RBP groups and their associated RNA regulatory elements.

[**POSTAR**](http://lulab.life.tsinghua.edu.cn/postar)

>  Yumin Zhu, Gang Xu, Yu-Cheng T. Yang, Boqin Hu, et al. Nucleic Acids Research (2019) / (2017)

Website: http://POSTAR.ncRNAlab.org

POSTAR is a platform for exploring post-transcriptional regulation coordinated by RNA-binding proteins. It enables the experimental biologists to connect protein-RNA interactions with multi-layer information of post-transcriptional regulation and functional genes, and helps them generate novel hypotheses about the post-regulatory mechanisms of phenotypes and diseases.

[**CLIPdb**](http://clipdb.ncrnalab.org)

>  Yu-Cheng T. Yang, Chao Di, Boqin Hu, et al. BMC Genomics (2015)

Website: http://CLIPdb.ncRNAlab.org (moved into POSTAR)

CLIPdb is an integrative resource of CLIP-seq studies. It aims to characterize the regulatory networks between RNA binding proteins (RBPs) and various RNA transcript classes by integrating large amounts of CLIP-seq (including HITS-CLIP, PAR-CLIP and iCLIP as variantions) data sets.

# 03
## RNAstructurome

**RNAex** (*deprecated*)

>  Yang Wu, Rihao Qu, Yiming Huang, et al. Nucleic Acids Research (2016)

RNAex is an RNA secondary structure prediction server enhanced by high-throughput experimental data. We have re-mapped raw data of the published probing experiments to the whole genome, thus users can predict secondary structures for novel RNA transcripts.

[**RME**](https://github.com/lulab/RME)

>  Yang Wu, Binbin Shi, et al. Nucleic Acids Research (2015)

Github: https://github.com/lulab/RME

RME is a tool for RNA secondary structure prediction with multiple types of experimental probing data. It is based on the [RNAstructure](http://rna.urmc.rochester.edu/RNAstructure.html) package. It also provides preprocessing scripts for transforming the SHAPE, PARS and DMS-seq data into pairing probability according a posterior probabilistic model. Moreover, it also contains a utility for optimizing the parameters of RME by RME-Optimize.

# 04
## RNAmed

**RNAdrug** (*coming soon*)

AI platform to design drug targetting RNA.

**exOmics** (*coming soon*)

Multi-Omics data and diagnosis panels for liquid biopsy of cancer and other diseases.

**Multi-transformer** (*coming soon*)

Transformer model integrating multimodal data.

**CCG** (*deprecated*)

> Mengrong Liu, Yu-Cheng T. Yang, et al. Discovery Medicine (2016)

CCG, Catalogue of Cancer Genes/lncRNAs, is an assembly resource of coding and noncoding genes associated with cancer. In addition, drug-gene information in CCG provides a useful guide to the development of new anti-cancer drugs.
