---
title: projects
eleventyExcludeFromCollections: true
tags: landing
layout: postLayout.njk
pagination:
    data: collections.project
    size: 5
    addAllPagesToCollections: true
    reverse: true
    filter: 
        - landing
    alias: proj
---

Some things that I've worked on. 

{% for project in proj -%}
<div class="post-preview">
    <h2 class="compact subtitled"><a {% if project.data.projectLink %}href="{{project.data.projectLink}}"{% else %}href="{{project.url}}"{% endif %}>{{project.data.title}}</a></h2>  
    <p>{{project.data.blurb}}</p>
</div>
{% endfor %}