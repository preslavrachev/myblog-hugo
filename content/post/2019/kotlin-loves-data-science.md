+++
author = "Preslav Rachev"
categories = ["Data Science"]
date = 2019-02-03T14:29:06Z
description = ""
draft = false 
image = "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ"
slug = "kotlin-loves-data-science"
tags = ["Data Science", "Kotlin", "Programming", "Meetup", "Munich"]
title = "Kotlin ❤️ Data Science? (Part 1)"

+++

A few days ago, I was invited to give a talk at the [Munich Kotlin Users Group](https://www.meetup.com/Kotlin-User-Group-Munich/events/257927489/) meetup (check out my slides [here](https://speakerdeck.com/preslavrachev/kotlin-data-science)) For quite some time, I have had an idea to promote Kotlin as the missing link between software engineering and Data Science. During[ KotlinConf 2018](https://preslav.me/2018/11/01/kotlinconf-2018-recap/), I had the chance and the privilege to meet a couple of amazing people, whose talks only helped confirm my thoughts.

{{< youtube -zTqtEcnM7A >}}
[Mathematical Modeling with Kotlin | Thomas Nield](https://youtu.be/-zTqtEcnM7A)

{{< youtube yjVW6uCmVBA >}}
[Building Data Science Workflows with Kotlin | Holger Brandl](https://www.youtube.com/watch?v=yjVW6uCmVBA)

Indeed, the future seems full of opportunities for Kotlin, but not before JetBrains and the developer community remove a few of the pending roadblocks.

The following article is the first part of a two-part series based on my talk. After the meetup, I realized that the topic is far deeper than just going through a few slides about what Kotlin as a language can and can’t. Therefore, I decided to properly introduce the reader to the topic first. Next time, we will talk about where and how Kotlin can fit into the puzzle.

# The Problem with Data
We live in an age of unprecedented data abundance. So much, that our wishful imagination is easy to make us believe that we are on the verge of getting computers to think. Not surprisingly, when speaking about the future, the use of the term “AI” has recently become a favorite topic among company management and technology media alike.

Yet, in reality, we are only touching the surface. The path towards autonomous AI requires more basic human intervention than anything else. In particular, it needs a way for properly communicating data science into the software engineering field, and vice versa.

Aren’t We Already There?
Nope, not quite. Bringing data science into the production workflow of established companies is not as easy as one might think. More so, when talking about the JVM, which a vast majority of enterprise software has been built upon.

See, there is a mismatch between software engineering and data science practices:

Software engineering works best when building well-defined systems. Requirements are set at the beginning and ideally, evolve over time, but rarely change entirely. There are traceable boundaries between components, with deterministic inputs and outputs, to help testability and ease extension. Like other forms of engineering, building a piece of software starts with a rough skeleton, which gets iterated over time and again. The goal of every step is to make the software either more feature complete or gradually morph it into a new direction, but keep it compatible with the original requirements.

Data science, on the other hand, deals with supporting or refuting hypotheses. Like other fields of science, it starts with a relatively generic question and goes through a process of data exploration and validation, until either the question can be answered fully, or it needs to be formulated again, due to an insufficiency of the data/selected approach. The exploration phase often involves trying out different approaches and seeing a large portion of them fail. This is why it is so important for the data science field to use tools and technologies that allow for easy exploration and visualization of the underlying data.

![](https://cdn-images-1.medium.com/max/800/0*_At3wUK_Zqgz_goL.png)
[Machine Learning | xkcd](https://www.xkcd.com/1838/)

Another important difference between software engineering and data science is the interpretation of the outputs of systems at hand. Although, the understanding of distributed systems has almost become a science of its own, interpreting the outcome of a non-deterministic machine learning model is a whole different game. It is not easy to unit-test complex ML models, mainly because of the level of randomness they are built upon. Removing this randomness factor can help test the model in isolation, but might also provide the wrong assumptions when feeding the model with real-world data. Just like with the exploration phase above, it is a matter of having the right tools at hand and a fairly deep level of human interpretation.

![](https://cdn-images-1.medium.com/max/800/0*ihz1vmQr7OcBTVx4.png)
[Extrapolating | xkcd](https://xkcd.com/605/)

# AI, ML, and the Role of Data Science in All of This
So, we are back to our favorite term: Artificial Intelligence, also known as AI. AI has had a long history of ups and downs, most notably its birth and early progress during the 1950s and 1960s, followed by the so-called AI winter covering most of the late 1980s, 1990s, and the beginning of the 21st Century. The recent advancement of hardware technology has given researchers the opportunity to dig out the old papers, beat them off the dust, and re-imagine the utopian bright future, in which humans and machines become alike.

The fields of AI and Data Science have been complementing one another for a long time. Yet, while AI still seems rather ephemeral and difficult to grasp (a bit like Virtual Reality), Data Science resembles Augmented Reality, in that it employs technology, but leaves the ultimate decision and interpretation to humans.

Machine Learning (or ML, for short) is just one of the techniques that both rely on, in order to make machines reason about large amounts of data, but by far not the only one.

If you are looking for a more cynical view of the difference between the three you can rather use this one:

- AI is what brings the VC Money in.
- ML (a.k.a sophisticated brute-force) is what gets the job done. ML models are very limited to a given domain.
- DS is the craft of finding which ML model works for a particular case, and which doesn’t.
  
Until next time, when I will talk more about whether Kotlin can help fill the gap between Software Engineering and Data Science, as well as what steps are still needed to help us get there.

# Further Resources

The slides to my talk
<script async class="speakerdeck-embed" data-id="99478ac60b134f5393f45d382b1d1bc6" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- [The AI Misinformation Epidemic](http://approximatelycorrect.com/2017/03/28/the-ai-misinformation-epidemic/)
- [What’s the Difference Between Artificial Intelligence, Machine Learning, and Deep Learning?](https://blogs.nvidia.com/blog/2016/07/29/whats-difference-artificial-intelligence-machine-learning-deep-learning-ai/)
- [Data Science Has Become Too Vague](https://towardsdatascience.com/data-science-has-become-too-vague-538899bab57)
- [Deep Misconceptions About Deep Learning](https://towardsdatascience.com/deep-misconceptions-about-deep-learning-f26c41faceec)
- [What is your favorite “data analysis” cartoon?](https://stats.stackexchange.com/questions/423/what-is-your-favorite-data-analysis-cartoon/9254)
