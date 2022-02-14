---
title: blog
eleventyExcludeFromCollections: true
layout: postLayout.njk
---

Mostly notes for future-me.

{% for post in collections.post | reverse -%}
- [{{post.data.title}}]({{post.fileSlug}})
{% endfor %}