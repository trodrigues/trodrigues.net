Today I was reading yet [another article](https://www.pandastrike.com/posts/20150311-react-bad-idea) about a framework and why it’s horrible and a bad idea.

I’ve tried not to concern myself that much with acknowledging or providing an opinion on these kinds of articles, but this one has struck a nerve with me, and I know that sooner or later someone would mention it to me and asked my opinion about it, so I decided to provide my analysis in tweet form:

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p><a href="https://t.co/rabms0g7q4">https://t.co/rabms0g7q4</a>&#10;&#10;a) you don’t need to use JSX with react&#10;b) it could potentially be made to render to web components</p>&mdash; Tiago Rodrigues (@trodrigues) <a href="https://twitter.com/trodrigues/status/576325992622518272">March 13, 2015</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p>just another day of misinformed framework/library criticism ¯\_(ツ)_/¯</p>&mdash; Tiago Rodrigues (@trodrigues) <a href="https://twitter.com/trodrigues/status/576326107546447872">March 13, 2015</a></blockquote>

I decided to expand a bit on it with this post because of some of the replies I got and I’ll address both tweets separately.

Regarding the article, it seems to me like it focuses mostly on two things:

* The author doesn’t like JSX.
* The author prefers the idea of Web Components.

And you know what? I agree with both. I don’t particularly like JSX, but mostly for its syntax. But i do I understand the why of JSX. And I also loved the idea of Web Components from the first moment I heard about them (specially because at the time I was doing something similar on a more clunky form with iframes).

But using these two points to say React is terrible and you shouldn’t use it is in my opinion a failed argument.

First of all, [you don’t need JSX](http://facebook.github.io/react/docs/displaying-data.html#react-without-jsx). This is not a dark hidden feature, and it’s well known and documented. JSX is provided for convenience reasons and eventually you can have other ways of writing this view code, and even [separating it from your view controllers](https://github.com/wix/react-templates).

In fact, I would really like to see things like [react-templates](https://github.com/wix/react-templates) become more popular and I would really like to find the time to write a Jade to React compiler.

And even [virtual-dom](https://github.com/Matt-Esch/virtual-dom) uses [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript) as a way to define the DOM, which is not that different from what React does.

Yes, it would’ve been good to see all of these different parts of React be more modular and separated, but the main point that is made here that you are forced to use JSX is not really a valid one.

(And in general React has become much better organized in terms of internal components compared to its early days, which is part of the reason why things like React Canvas or React Native are also possible).

Second, React could eventually be made to render to Web Components. I don’t know if this would ever be part of the core React project as some of its authors have expressed a dislike for Web Components in the past (for reasons I can’t quite remember and don’t want to look around for them right now), but the point remains that someone could make it render to Web Components if desired.

The article makes it sound like you could not ever do both simultaneously and that using one thing means not being able to use the other.

The same article even mentions [React Canvas](https://github.com/flipboard/react-canvas) as an example of a React based tool that renders to something else, and mentions a combination of virtual-dom and Web Components as a possibility.

Like I said before, it would be good if React was more modular, but the possibility of having it render to Web Components exists, and writing something in React doesn’t exactly lock you down to rendering things in a proprietary format that only something coming out of Facebook understands.


Update: @Vjeux who works on React.js tweeted this at me after I posted this article:


<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/trodrigues">@trodrigues</a> &quot;React could eventually be made to render to Web Components&quot;. It&#39;s on the roadmap to have proper support for web components</p>&mdash; Vjeux (@Vjeux) <a href="https://twitter.com/Vjeux/status/576556164470710272">March 14, 2015</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/trodrigues">@trodrigues</a> right now you can output custom tags but can&#39;t output custom attributes or events yet directly from the core</p>&mdash; Vjeux (@Vjeux) <a href="https://twitter.com/Vjeux/status/576556557762166784">March 14, 2015</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p><a href="https://twitter.com/trodrigues">@trodrigues</a> BUT, you can make a wrapper using componentDidMount and componentWillReceiveProps and do manual mutations if you have to</p>&mdash; Vjeux (@Vjeux) <a href="https://twitter.com/Vjeux/status/576556721386217472">March 14, 2015</a></blockquote>


The article also makes a point about React coupling views with models, which is a bit misleading. If anything, React couples [view with view models](http://en.wikipedia.org/wiki/Model_View_ViewModel), that is, the data a view needs to be rendered. The distinction matters.

And yes, React couples behaviour with templates, but like Pete Hunt said on his [JSConf EU talk](https://youtu.be/x7cQ3mrcKaY?t=5m48s) these two things will generally be tightly coupled anyway. My data on this is anecdotal, but in my experience having different templates that can have different behavioural logic on top of them often becomes a maintenance burden. Generally what we want is a template that can render the same data in different places, and that should probably have no behaviour attached to it.

**Update**: just after posting this saw a link to [this article](https://phuu.net/2014/12/03/concerning-separation.html) by Tom
which argues this even better.

And sure, this, like Hack or other FB technologies is part of their battle for engineers (hell, a week after I discussed React with Pete at JSConf I had an FB recruiter on my email), but I wouldn’t say that in itself is what leads to a walled garden. Business practices do.

### Misinformed criticism

(In which I address my second tweet)

Today at lunch with [Stephan](http://twitter.com/evilhackerdude) he mentioned how tired he is of the framework negativity articles that recently seem to make the rounds every now and then (also thanks for providing a title idea for this article!).

I’m tired too, and not because I don’t have criticism of my own, but mostly because the majority of these articles are generally very misinformed and based on very badly constructed arguments.

Sure, they’re probably generally opinions and everyone’s entitled to have and share their opinion. But the ones reading the articles generally take them as fact that these frameworks are bad and if you use them you should feel bad.

What I see often is people who are either fairly new to frameworks and are facing some issues, or who haven’t really used the framework but are taking an outside look at it and just picking on points they seem to think are bad.

Most of the unfounded criticism I see is towards Angular. I’ve been working on my day job with Angular for almost 2 years now, and was looking into it well before it became heavily popular.

After all this time, I too have a lot of criticism of Angular (and that could be a whole other blog post), and I probably wouldn’t start a new project with it. Most of the articles I see criticising Angular mention little or none of the pain points I’ve come across and generally sound like the feelings I’ve had towards it in the first few weeks of using it.

A lot of these pain points are things that lots of people have come across. Yes, they are real pain points, but lots of them are solved by sharing knowledge across the community, improving documentation and practices around the framework environment.

React for instance are doing a great job about this, and Flux is essentially a result of it. A lot of people were asking how to use React in a full app. How do you get data, how do you structure things? Some people wrote articles about how to use it with Backbone. Facebook shared their own approach. It’s not the only way to do it, but it’s a way, and people don’t feel so lost as they maybe did in the early days of Angular (or even Backbone).

Everyone will see negatives in tools and frameworks, and get pissed about them and criticise them, but I would really like to see people try and get a better understanding of the tools and practices around them, share them and increase the overall health of the development community, rather than just write hit pieces with misinformed facts and criticism about why framework X sucks and you should use it.

<code>&lt;/rant&gt;</code>

And I won’t even start with the discussion about frameworks and server rendering. That would also be a whole other blog post and [I’ve been personally trying to do something about that](https://github.com/contentful-labs/guide-app-sw).
