---
date: "2020-07-14"
tags:
- code-journal
- R
title: Scraping two-column PDFs in R
---

## What I was trying to do

Scrape text from PDFs where the text was laid out in two columns.

## What I tried first: pdftools and readr

Many text scraping tutorials in R recommend using <code class="language-r">pdftools</code> to extract text from a PDF file. So far, so straightforward.

```r
library(pdftools)
library(tidyverse)

text <- pdf_text("my_file.pdf")
```

That results in a character vector, but it still needs cleaning -- each element in the vector is a chunk of text, and there's loads of whitespace throughout. One way to clean things up is to <code class="language-r">readr::read_lines()</code> to expand out the vector so that each line in the file is its own element, and then use <code class="language-r">stringr::str_squish()</code> to trim whitespace.

```r
lines <- readr::read_lines(text) %>%
    stringr::str_squish()
```

However, when looking at the results, it became clear that the text had been garbled. Rather than reading text in line-by-line within one column before moving to the next, <code class="language-r">pdftools::pdf_text()`</code> read text in line-by-line across both columns.

## What I ended up using: tabulizer

I ended up switching from <code class="language-r">pdftools</code> to <code class="language-r"><a href="https://cran.r-project.org/web/packages/tabulizer/index.html">tabulizer</a></code>, which uses the Tabula Java library to extract tables and text from PDFs. Its <code class="language-r">extract_text()</code> function correctly read the text going down one column first, then the other, and even returned the result as a single element in a character vector.


```r
lines <- tabulizer::extract_text("my_file.pdf") %>% 
    stringr::str_split("\r\n")
```

A word about the second part of this code snippet. As it turned out, the output of <code class="language-r">extract_text()</code> was too long to bind to a data frame record as I needed to do next. The text was getting truncated. To address that problem, I split the scraped text along carriage returns with <code class="language-r">stringr::str_split()</code>, resulting in a list of lines. This list could then be bound in its entirety to the data frame and written to an RDS file.