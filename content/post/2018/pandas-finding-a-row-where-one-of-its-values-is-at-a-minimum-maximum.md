+++
author = "Preslav Rachev"
categories = ["Data Science"] 
date = 2018-02-16T06:58:00Z
description = ""
draft = false
slug = "pandas-finding-a-row-where-one-of-its-values-is-at-a-minimum-maximum"
tags = ["Python", "Pandas"]
title = "Pandas: Finding a Row Where One of Its Values Is at a Minimum/Maximum"

+++

Often, we will want to get to get a specific row, which marks the minimum or maximum of one of its columns. Let's suppose we have the [SF Salaries dataset from Kaggle](https://www.kaggle.com/kaggle/sf-salaries). We want to find the employee name, with the largest total pay benefits. The experience with writing NumPy/Pandas filter conditions will quickly let us produce the following version:

```python
sal[sal['TotalPayBenefits'] == sal['TotalPayBenefits'].max()]['EmployeeName']
```

which is absolutely valid, but is it the only option? I could imagine that that in a large dataset, there would be quite a lot of comparison involved, plus the creation of a whole new data series (the filter condition). Is there perhaps a more performant one? How about trying out [idmax()](http://pandas.pydata.org/pandas-docs/version/0.17.0/generated/pandas.DataFrame.idxmax.html) (or, for those coming from NumPy, [argmax()](http://pandas.pydata.org/pandas-docs/version/0.17.0/generated/pandas.DataFrame.argmax.html), both do the same). By given a column, the function will return the index of the data frame, where it is at its highest.

```python
sal.loc[sal['TotalPayBenefits'].idxmax()]['EmployeeName']

sal.loc[sal['TotalPayBenefits'].argmax()]['EmployeeName']
```

I did a quick performance check, and indeed, idmax/argmax turn out twice as fast:

```bash
# the original filter condition
815 µs ± 11.5 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)

# idmax()
402 µs ± 7.61 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)

# argmax
404 µs ± 8.81 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
```



