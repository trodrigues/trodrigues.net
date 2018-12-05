---
layout: post
title: Refactoring CSS
date: 2016-12-01
---

After reading this [tweet](https://twitter.com/philip_roberts/status/801005333883813888) I thought I'd write some thoughts on why I disagree with the idea that CSS is unrefactorable.

I've done this before. I've taken a huge app, with a fairly
complicated Jenga tower of CSS using lots of SASS nesting and turned it
into something clean and maintainable. It took time, it was difficult
and it took lots of discipline, but it's doable. And yeah, this probably won't always work, but here's the approach I took.

- Start by defining guidelines and a class naming system
    - How to structure files, what methodology you're using. Doesn't really matter which, but pick one.
    - Every time a new use case comes along where people are not sure how
    to apply the methodology, talk about it and document it as a use case
- Have a styleguide
    - Helps maintain visual consistency
    - Helps with people not reinventing things all the time (sometimes it has to be done though)
- Code review code review code review

Now, how do you take a huge convoluted mess and turn that into something maintainable?

For smaller things it might be doable, but what happens you have a
huge tree structure of nested SASS code that gets used in a few
different pages where each page has other tree structures with slight
variations that override things?

A good thing to do is, start with a specific page/module/section.
Rewrite that code anew, but doing exactly the same thing. Put it in a
new module. Let's say you've decided to use BEM and you call it `.price-display`

When you move on to the next page/module that uses similar code, just remove all usage of any of the old styles and try using the ones you
wrote for the page before. You'll probably need to add some newer
things, so you'd end up having something like `.price-display--list` where you extend `.price-display` (or use it as a mixin, but that's a whole other topic).

You can keep doing this with smaller modules, page layouts, etc.
You'll have a period of having repeated code, yes, until you can make
sure the old crappy code isn't being used anywhere and you've recreated
everything as more reusable and cleaner modules.

And the good thing is you don't need to do everything at once. You
can say, when we touch page X, let's add some time to do this clean up
for that page.

Of course that requires quite a bit of discipline. Everyone needs to
be on board with the strategy and carry it over time. Code reviews and
documenting the strategy and guidelines help there.

Again, this isn't a silver bullet and probably doesn't work for all
cases, but people need to stop treating CSS as an after thought and care about it as much as they care about the rest of code when it comes to
guidelines, code reviews, etc.