---
date: "2020-08-08"
tags:
- code-journal
- R
- Java
- sudo-what
title: Setting up rJava properly
---

Back to working with RStudio Server on an EC2 instance. This instance is running on Ubuntu 18.04, installed from [Louis Aslett's RStudio AMIs](https://www.louisaslett.com/RStudio_AMI/). The AMIs come with the Java 8 Runtime Environment, which I assumed meant that I could install and  Java-dependent R packages out of the box.

That turned out not to be the case, and I hit a snag trying to install <code class="language-r">tabulizer</code>:  

```r
ERROR: dependency ‘rJava’ is not available for package ‘tabulizerjars’
```

Then, trying to install <code class="language-r">rJava</code> nets this error:

```r
configure: error: One or more Java configuration variables are not set.
Make sure R is configured with full Java support (including JDK). Run
R CMD javareconf
as root to add Java support to R.
```

Following the error message, I switched to the terminal. ran <code class="language-bash">sudo R CMD javareconf</code>, and hit another error:

```bash
conftest.c:1:10: fatal error: jni.h: No such file or directory 
```

Googling around, I found [Ronak Shah's blog post](https://shahronak47.wordpress.com/2016/12/29/install-rjava-package-in-r/) describing his journey getting rJava installed. I knew Java was included on the AMI, but figured I may as well see what happens installing it over, so I ran the following commands in the terminal.

```bash
sudo apt-get update
sudo apt-get install default-jre
sudo apt-get install default-jdk
```

<code class="language-bash">sudo apt-get update</code> did update some things. Nothing changed after running <code class="language-bash">sudo apt-get install default-jre</code>, as the Java Runtime Environment bundled in the AMI was already the newest version. Four new packages for the Java Development Kit were installed when I ran <code class="language-bash">sudo apt-get install default-jdk</code>, including default-jdk itself, suggesting the problem was that I didn't have the Java Development Kit installed.

After that, I ran <code class="language-bash">sudo R CMD javareconf</code> again, successfully updating the instance's Java configuration this time.

With that done, I was able to go back to the R console to install <code class="language-r">tabulizer</code>.