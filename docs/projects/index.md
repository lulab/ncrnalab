---
layout: default
title: Projects
description: Research @ Tsinghua
---

> 人类有大约2万个蛋白编码基因，但其序列的总长度仅占人类基因组总长度的1.5%左右。另一方面，人类基因组序列的~70%甚至更多都会被转录成RNA，它们很多都是非编码的RNA（**noncoding RNA**，**ncRNA**)。对于为数众多的**非编码RNA** (**ncRNA**)，我们还知之甚少。
>
> 因此，我们围绕非编码RNA发展生物信息学技术，并探索其在复杂疾病精准诊疗上的具体实践。我们充分发挥生物信息学这一交叉学科优势，通过和协和、清华长庚等一线医生专家的合作，在癌症、自身免疫疾病等复杂疾病上探索新的以非编码 RNA 为表现形式的靶标，在研究其免疫调控机理的同时，部分靶标可以应用为个性化精准诊疗时的生物标志物，部分靶标可以做为药物靶点通过AI进行药物设计，在复杂疾病（如癌症和自身免疫疾病）的临床**诊断**和**治疗**两个方面实现应用价值。
>
> About 20 thousand protein-coding genes in human were transcribed and tranlsated from only ~1.5% of human genome sequence. On the other hand, ~70% or more of the human genome  are transcribed into RNAs. Many of them are **noncoding RNAs** (**ncRNAs**), which are not well studied yet. 
>
> Therefore, we develop bioinformatics technology around non-coding RNA and explore its specific practice in the precise diagnosis and treatment of complex diseases. We utilize bioinformatics to explore new targets in the form of non-coding RNA in complex diseases such as cancer and autoimmune diseases through cooperation with front-line doctors and experts. While studying its immune regulation mechanism, some targets can be used as biomarkers for personalized and precise diagnosis and treatment, and some targets can be used as drug targets for drug design through AI. 



对应着“诊断”和“治疗”，我们围绕**非编码 RNA**（**ncRNA**）分两个主要的科研方向：1）生信辅助的精准医疗（Precision Medicine）；2）AI辅助的结构、靶标预测和药物设计 (AI-driven Structure/Target Prediction & Drug Design) （下图）： 

Corresponding to **diagnosis** and **treatment**, we have two major research directions centered on **noncoding RNA (ncRNA)**:

* TOC
{:toc}
<a href="https://cloud.tsinghua.edu.cn/f/b77381dca00844a4890c/"><img src="projects.webp" style="zoom:85%;" /></a>




---




## I. Precision Medicine {#med}

We develop sequencing and bioinformatics methods to study cellular and extracellular transcriptome of coding and **noncoding RNAs** (**ncRNAs**). By integrating transcriptomics data with other multiomics data, we aim to explain development of complex diseases (e.g., cancer, immune related diseases) based on an integrative, multi-dimensional level. For instance, we seqeunce and curate multi-omics data. Then, we explore deep learning, transfer learning, similarity network fusion and other bioinformatics analysis techniques for these data. 

The application of these methods to precision medicine can be mainly divided into two research directions: **Detection** and **Regulation**, including cancer screening and research on microenvironments such as immunity and cancer microbiome.

我们探索新的高通量测序和生物信息学方法，研究和分析细胞内和细胞外的转录组 ，尤其是**非编码 RNA** (**ncRNA**)的转录组。通过结合转录组和其他多组学数据，我们将从一个系统性的多分子层面揭示复杂疾病（如癌症, 免疫相关疾病）的发生发展规律。例如，我们测序和收集体液多组学数据，基于这些多模态数据, 我们探索深度学习、迁移学习、相似网络融合等生物信息分析技术和方法。

这些方法应用在精准医疗上可以主要分为**Detection**和**Regulation**两个研究方向，包括了癌症筛查、免疫调控、人体内的微生物调控等。

<div align="middle">
<img src="research.webp" style="zoom:25%;" />
<br>
<small>We apply noncoding RNA (ncRNA) focused genomics and bioinformatics technologies to precision medicine, e.g., cancer microbiome, cancer screen and immunotherapy.</small>
</div>



### 1. RNA Detection

***Discoverying novel noncoding RNAs*** ：With the advancement of sequencing technology, especially the development and maturity of sequencing technology at the single-cell and single-molecule level, we have the ability to discover new noncoding RNAs from more species, more tissues, and more cell types. For example, we can discover and study new noncoding RNAs under different environments and conditions from the metatranscriptome of diverse microbial communities. These studies will not only expand our understanding of the diversity of life, but may also reveal new biological mechanisms cross-species.

***Discoverying novel noncoding RNAs*** ：随着测序技术的进步，尤其是单细胞、单分子水平的测序技术的发展和成熟，我们有能力从更多物种、更多组织、更多细胞类型中发现新的非编码RNA。例如，我们可以从纷繁复杂的微生物群落的宏转录组中发现和研究不同环境和条件下的新非编码 RNA。这些研究不仅将扩大我们对生命多样性的理解，还可能揭示新的、跨物种的生物学机制。

***cfRNA-seq Development.*** The cfRNA content in clinical plasma samples is very low and fragmented. Therefore, it is necessary to solve the problems of low signal-to-noise ratio and high cost of sequencing data. We apply technologies such as TSO, early barcoding, UMI, and CRISPR-Cas9 to develop novel cfRNA-seq technologies that reduce the cost of high-throughput sequencing, and improve the signal-to-noise ratio of sequencing data.

> In clinical studies like liquid biopsy, **exRNA** (extra-cellular RNA) is also called **cfRNA** (cell free RNA). Many exRNAs are **noncoding RNAs** (**ncRNAs**), like miRNA, lncRNA, srpRNA, circRN, etc. 

***cfRNA-seq Development***: 临床血浆样本中的 cfRNA 含量很低且碎片化，需要解决测序数据信噪比低、成本昂贵等问题。我们应用模板转换、早期标记、分子标签和CRISPR-Cas9等技术，开发新型 cfRNA-seq 技术，降低构建高通量测序文库的经济成本并提高了测序数据的信噪比。

> **exRNA** (extra-cellular RNA) 在很多临床研究尤其是液体活检研究中又称为 **cfRNA** (cell free RNA) ，包括了很多**非编码 RNA** (**ncRNA**)，如 miRNA，lncRNA，srpRNA，circRNA等。

<div align="middle">
<img src="../open/image/exRNA-seq.jpg" style="zoom:33%;" />
<br>
<small>Different NGS (next-generation sequencing) libraries of cfRNAs</small>
</div>



***Bioinfo. Method Development.*** Multiple regulation events (e.g., expression, splicing, editing, fusion) can be quantified by bioinformatic analysis from cfRNA-seq data.  For multi-modal data, such as cfRNA-seq derived multi-view data and/or multi-omics data, we need 4 steps for machine learning analysis, including 1) Data Cleaning, 2) Feature extraction and engineering, 3) Model Fitting, 4) Classifier. We develop corresponding bioinformatics method, software, database and other tools for these four steps (see more in [Software](https://www.ncrnalab.org/software/)). For instance, we integrate these multi-modal data using deep learning models, such as Transformer, Adversarial autoencoder (AAE) and Deep adversarial variational autoencoder model. 

***Bioinfo. Method Development:***  我们可以由cfRNA-seq通过生物信息分析计算得到多模态数据（例如表达、剪接、编辑、融合等）。对于多维度、多模态的高通量数据（例如 cfRNA-seq分析得到的多模态数据，以及multi-omics数据），我们需要进行4个步骤来进行机器学习等分析，包括 1) Data Cleaning, 2) Feature extraction and engineering, 3) Model Fitting, 4) Classifier。我们针对这4个步骤开发相应的生物信息学方法、软件、数据库等工具（详见： [Software](https://www.ncrnalab.org/software/)）。例如，我们探索转换器（Transformer）、对抗自编码器（Adversarial autoencoder, AAE）、深度对抗变分自动编码器模型（Deep adversarial variational autoencoder model）等深度学习模型，进行多模态数据的整合。



***Clinical Application for Cancer Screen.*** Subsequently,  by applying these methods to liquid biopsy, we help many clinical studies like cancer screen.

***Clinical Application for Cancer Screen:*** 最后，我们将这些方法应用在液体活检上，助力解决临床问题，例如癌症早筛。

<div align="middle">
<img src="multiomics.webp" style="zoom:50%;" />
<br>
<small>Multi-dimensional data for liquid biopsy of cancer (Heitzer et al., Nature Reviews 2019) </small>
</div>








### 2. RNA Regulation

***RNA Regulation & Immunotherapy.*** RNAs are dynamicly regulated during transcription. In addition, after RNA is transcribed, it will also have very complex and fine post-transcriptional regulation, such as alternative splicing (AS), alternative polyadenylation (APA), degradation, editing, modification, cellular localization and so on. These are closely related to the structure of RNA itself and the proteins that recognize RNA sequence and structure. At the same time, RNAs, especially **noncoding RNAs** (**ncRNAs**), also regulate other macromolecules, thus playing important roles in innate immune response to viruses and cancer immunity. We explore these complex regulatory processes in complex diseases such as cancer, autoimmunity, which are applied to immunotherapy.

***RNA Regulation & Immunotherapy:*** RNA不仅在转录时被动态调控，而且在被转录后也会有着非常复杂而精细的调控工程，例如剪接，修饰，细胞定位，编辑，加尾，降解等等。而这些又和RNA自身的结构以及识别RNA序列和结构的蛋白息息相关。同时，RNA，尤其是**非编码 RNA** (**ncRNA**)，还会调控其他大分子，从而在人体对病毒的免疫应答以及癌症免疫等重要生命过程中发挥作用。我们在癌症、自身免疫等复杂性疾病中探索这些复杂的调控过程，并应用于免疫治疗。



<div align="middle">
<img src="dsRNA.webp" style="zoom:30%;" />
<br>
<small>dsRNA sensors and their signalling (Chen & Hur, Nature Reviews 2022).</small>
</div>


## II. AI-driven Structure Prediction & Drug Design {#AI}

The introduction of new methods and new thinking in different fields can often lead to breakthrough progress in this discipline, so we pay special attention to introducing new technologies and new thinking in the latest computing field (such as new methods in deep learning) into biological data. We use bioinformatics methods to explore basic scientific questions such as the structure, regulation and target of RNA, especially **noncoding RNA** (**ncRNA**). Finally, it will bring us the new era of drug design.

不同领域的新方法和新思维的引入，往往能带来本学科的突破性进展，所以我们尤其注意将最新的计算领域的新技术和新思维（例如深度学习中的新方法）引入到生物数据的研究上，利用生物信息学和最新的 AI方法在RNA，尤其是 **非编码 RNA** (**ncRNA**），的结构、调控和靶标等科学问题上进行探索。最终，这些将带领我们进入一个崭新思维的药物设计新时代。

We will study in two sub-directions, **Structure** and **Target**: RNA structure prediction, RNA vaccine design, functional RNA target prediction, drug design for target RNA, etc.

我们将充分发挥人工智能的优势，利用深度学习等最新的计算技术整合 多方面的信息，重点研究 **Structure** 和 **Target** 两个子方向：进行RNA结构预测、RNA疫苗设计、功能性 RNA 靶标预测、靶标RNA的药物设计等研究。

### 1. RNA Structure

***RNA Structure Prediction.***  We develop structure prediction algorithm for RNA. The accurate prediction of RNA structure will help us better understand its regulation and function, thus improving its drug design.

***RNA Structure Prediction:*** 我们开发针对 RNA 的结构预测算法，对 RNA 结构的准确预测，将帮助我们更好地理解 RNA 的调控和功能，并应用于药物的设计。

***RNA Vaccine Design:*** mRNA, as well as other RNAs like circular RNA, can be used as RNA vaccines. In the design of RNA vaccines, the design of RNA structure, codons and modifications are very important research directions. Improving the stability of RNA in storage and transportation, and the effectiveness and targeting of delivery to cells and the human body are very important and cutting-edge research directions.

***RNA Vaccine Design:*** mRNA，以及环装RNA（circular RNA）等，可以用来做为RNA疫苗。在 RNA 疫苗设计中，RNA 结构、密码子和修饰的设计都是非常重要的研究方向。不论是 RNA干扰还是RNA疫苗，提高RNA 在存储和运输中的稳定性，递送到细胞和人体内的有效性和靶向性，都是非常重要和前沿的研究方向。

<div align="middle">
  <img src="rna-structure-prediction.webp" style="zoom:20%;" />
  <br>
  <small>Prediction of 2D and 3D structure of RNA. (Waring & Davies. ,1984, Gene;  Cate et al. ,1996, Science)</small>
</div>

### 2. RNA Target

***RNA Target & Drug Design.*** The number of human proteins that can be used as small-molecule drug targets is very limited：Of the ~20 thousand protein-coding genes in human (~1.5% of human genome sequence),  about 10%-15% are directly related to diseases; among these genes, it is estimated that less than 700 protein products are druggable (only ~0.05% of human genome sequence). On the other hand, ~70% or more of the human genome  are transcribed into RNAs. Most of them are **noncoding RNAs** (**ncRNAs**). In recent years, more and more researchers have tried to use RNA as a drug target, and initially proved the feasibility of this strategy. In particular, it is worth noting that Coronavirus (COVID-19) is an RNA virus, and its genome itself is also promising as a drug target. In addition, using noncoding RNA for disease treatment is also a promising research direction, for example, siRNA-based RNA interference (RNAi) system has aleady been used to develop new gene therapy methods. Due to the high complexity and variability of RNA structure and the limitations of experimental methods, our current understanding of the three-dimensional structure of RNA is still very limited, and the development of RNA-targeting drugs is still in its infancy. We will use the latest artificial intelligence technologies such as deep learning to integrate various information,  and subsequently to design drugs targeting RNAs. 

***RNA Target & Drug Design:***可作为小分子药物靶标的人类蛋白数量非常有限：在人类的2万个左右的蛋白编码基因（占人类基因组总长度的1.5%左右）中，大约有 10%-15%与疾病直接相关；而在这些基因中，据估计仅有不到 700 个的蛋白产物是可以成药的 （仅占人类基因组总长度的 0.05%左右）。另一方面，人类基因组的~70%甚至更多都会被转录成 RNA，其中大多是**非编码 RNA** (**ncRNA**)。因此，近年开始有越来越多的研究者试图将 RNA 作为药物靶标，并初步证明了这一策略的可行性。尤其值得我们注意的是，新冠病毒就是 RNA 病毒，其基因组本身也有希望被作为药物靶标。此外，利用非编码RNA进行疾病治疗也是一个有前景的研究方向，例如，基于 siRNA 的RNA干扰（RNA interference, RNAi）系统等已经被用于开发新的基因治疗方法。由于 RNA 结构的高度复杂性和可变性，以及实验方法的限制，目前我们对于 RNA 的三维结构的了解仍非常有限，靶向 RNA 的药物研发也处在起步阶段。 我们将充分发挥人工智能的优势，利用深度学习等最新的计算技术整合多方面的信息，设计新药物靶标RNA。

<div align="middle">
  <img src="drug_rna.webp" style="zoom:30%;" />
  <br>
  <small>The potential RNA-targeted druggable genome (Warner, et al., <i>Nature Reviews | Drug Discovery</i>  2018)</small>
</div>


## Funded Projects

* **Funding:**

  * 2024-2027     Bioinformatics study of noncoding RNA omics in precision diagnosis and treatment of autoimmune diseases, PI, National Natural Science Foundation of China
  * 2022-2025     Bioinformatics study of body fluid multi-omics data integration for cancer diagnosis Novel, PI, National Natural Science Foundation of China
  * 2020-2023     Novel extracellular RNA biomarkers for cancer diagnosis and prognosis, PI, National Natural Science Foundation of China
  * 2021-2023     Development of bioinformatics technology for body fluid multi-omics data in cancer PI, National Center for Protein Sciences (Beijing)
  * 2023-2024     AI-driven drug design targeting RNA, PI, Bayer Micro-funding
  * 2022-2025     Multi-Omics study for personalized neoadjuvant therapy of HCC, co-PI, Tsinghua Precision Medicine Institute
  * 2022-2024     AI model informed by biological network for early cancer diagnosis, PI, Tsinghua Guoqiang AI Institute
  * 2021-2023     Development of nucleic acid detection technology for microbial infection, PI, Tsinghua Chunfeng Foundation
  
    


* **代表性在研项目:**
  * 国家自然科学基金 面上项目，8237061277，自身免疫性疾病精准诊疗中基于非编码RNA组学和生物信息学的新方法研究，2024-2027  主持
  * 国家自然科学基金 面上项目，3217040246，体液多组学数据整合的生物信息学研究及其在癌症无创检测上的应用，2022-2025     主持
  * 国家自然科学基金 面上项目，81972798，针对癌症诊断和预后的新型体液exRNA标志物的研究， 2020-2023      主持
  * 国家“凤凰工程”  技术创新开放共享课题，2021-NCPSB-005，多组学整合的生物信息学研究，   2021/07-2023/06   主持
  * Bayer科研转化基金，AI driven drug design targeting RNAs, 2023-2024  主持
  * 清华大学精准医学研究院 精准医疗战略项目， 基于多组学数据的智能化中晚期肝癌转化治疗决策研究，2022/08-2025/07 共同主持
  * 清华大学国强研究院 人工智能与机器人项目，2021GQG1020，生物调控网络知识启发下的新型AI模型的构建及其在癌症早诊上的应用，2022/04-2024/03   主持
  * 清华大学春风基金，2021Z99CFY022，针对微生物感染的新型核酸检测技术研发，2021/09-2023/09   主持

