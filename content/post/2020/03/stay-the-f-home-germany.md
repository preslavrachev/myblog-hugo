---
title: "Stay the F*** Home, Germany!"
date: 2020-03-20T11:28:11+01:00
draft: false
categories: ["2 Cents"]
tags: ["2 Cents", "Coronavirus", "COVID-19", "Data Science", "Statistics"]
---

Judging by how much people in Munich seem to enjoy the sunny days of spring, I am going to conclude that either:

- they all live in complete denial of the situation
- they already gave up
- they fully trust that no matter what happens, the German healthcare system would fix them in no time.
- it’s sunny outside, so who cares

I’ve said it before, and I will say it once again. Social distancing does not mean complete isolation. I am totally for taking walks and individually doing sports. But come on, having group picnics in the middle of all this, is _merely irresponsible_.

What’s being widely played out in the media, is how dire the situation is in Italy. In the meantime, despite the increasingly growing worries of the Germany government, some part of the population seems to be unaffected. The popular belief is that the low death rate in Germany (0.3% as of 20.03) vs. that of Italy (8.3% as of 20.03.) is a signal that the virus is either not as deadly as previously predicted, or that Germany is well-equipped to handle it. While any of these statements may be true, sources suggest that there may be a difference in counting the casualties between countries, as well as differences in test sample interpretation, etc. Therefore, I’d still stick to the global death rate of 4.1% (as of 20.03).

What one is clearly underestimating, is the number of German people who will potentially get infected in the coming days.

One does not need a PhD in data science or some fancy AI tool to set up a simple prediction scenario of how the infection would roll out in the coming days. I used data from [Berliner Morgenpost](https://interaktiv.morgenpost.de/corona-virus-karte-infektionen-deutschland-weltweit/) and only Google Sheets for that. As we all know, viruses spread in an exponential fashion, by one person potentially infecting several other individuals. Based on the data, I calculated and plotted the daily percentage multiplier for Germany, Italy, and Europe:

{{< figure src="/images/2020/03/infection-acceleration.png" title="Infection acceleration: Germany, Italy and Europe" caption="Infection acceleration: Germany, Italy and Europe" >}}

Germany has the highest  for now (~1.35), meaning, that on a single day, the total number of infected people becomes 1.35 times larger than the day before. Of course, assuming that:

- everyone ultimately gets infected, develops immunity, and breaks the cycle
- measures are being taken to slow its spread
- Doomsday comes true and everyone dies

this multiplier will go down. And, looking at the data, it really seems to go down! Hurray! Let’s go out and have a beer!

Well, hold on a minute. The fact that seems to be slowing down does not mean that it won’t affect thousands or millions more on its way. Let’s try to do a rough prediction.:

This are the numbers that every source on the planet presents us every day:

{{< figure src="/images/2020/03/infected-people.png" title="Number of infected people: Germany, Italy and Europe" caption="# infected people: Germany, Italy and Europe" >}}

Germany being well below Italy, and both being well below the total for Europe. By all means, the situation in Italy seems far worse, and no one can question that. What no one can see however, is the dramatic turn of events, which may cause the situation in Italy to improve rapidly, and Germany to start nose-diving. 

Let’s look at the spread acceleration from the first chart again. Using a simple trick known to statisticians and stock traders, known as [Moving Linear Regression](https://www.daytrading.com/moving-linear-regression) we can plot a naive prediction model for the change of this acceleration by the end of April:

{{< figure src="/images/2020/03/mlr-acceleration-prediction.png" title="MLR acceleration prediction: Germany, Italy and Europe" caption="MLR acceleration prediction: Germany, Italy and Europe" >}}

Using my newly generated acceleration values, let me try and plot the total number of people that this model predicts would get infected by the end of April:

{{< figure src="/images/2020/03/infection-prediction.png" title="Predicted number of infectied people: Germany, Italy and Europe" caption="Predicted # of infectied people: Germany, Italy and Europe" >}}

And this is where the story turns upside down. The proactive measures taken by the Italian government seem to ultimately take an effect and flatten the curve significantly. Germany, on the other hand takes a leap into the hundreds of thousands, ultimately peaking by the end of April.

This is a dire scenario, and one that I am crossing fingers, my naive prediction model won’t even get close to. It assumes that no further measures are taken, and the social responsibility of the population remains at the same low level. At that level of reach, even with the lower death rate in Germany would result in thousands of deaths (950.000 * 0.003 results in 2850 people dead by the end of April alone).

Even if none of us or our families get affected by the Coronavirus (which I sincerely hope for), we bear a social responsibility for the people we encounter.  As passive transmitters, we might be causing the death of somebody, Of many.  We can prevent many of those deaths from happening by just staying home. 

---

## Read More

{{<oembed "https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca">}}

{{<oembed "https://staythefuckhome.com/">}}
