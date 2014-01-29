And so I finally have a brand new website.

This has been a long time coming. For the past 4 years or so, my website
has been mostly a placeholder, waiting for something a bit more
substantial and useful.

It all started when I decided that I was fed up with wordpress and
decided that I wanted to build my own thing. That thing has taken many
forms and has been a constantly evolving idea, and a good excuse to play
with different languages, frameworks, databases, technologies and ideas.

But the problem with that, specially when it's something that you're
doing on the side, is that you'll probably spend more time playing
around with the technologies than actually creating something you can
use.

Allied to the fact that my side project discipline and organization has
never been very good I spent the past few years without a proper
website, and a place where I could write and publish stuff.

Sure, I could just give up and start a tumblr or something like that,
and I actually did (even though I never made it public), but then I
kinda convinced myself that if I did that, I would never have real
motivation to put up a proper website.

And it's not like this website right now is really complex or full
featured (at the time of this writing it's an about page and this post),
but I finally have something I can easily update, which is easily
extendable, and which I'm really happy with.

And hopefully this will get me back to writing a bit more.

### The tools

After fiddling around with a various few static site generators, and
even attempting to build my own, I recently came across one which is not
marketed as a static site generator, but quickly became my favorite.

And that is [Harp](http://harpjs.com/). Harp is marketed as a web server
with preprocessing for various languages. It can be used for
development, in production, or as a library for your app. But it can
also be used as a static site generator if you so wish.

This, together with the fact that [Jade](http://jade-lang.com/)
finally clicked for me, made it easier to put together a simple new
website that I can now expand and build upon.

I think my favorite thing about Harp is the fact that it doesn't really
act as a framework on which you build upon. It's a neatly packaged and
well documented set of tools which you use to build something.

The code is [here](https://github.com/trodrigues/trodrigues.net), and
while there's not much to it for now, I also automated the whole process
as much as I could, creating a [small component](https://github.com/trodrigues/json2rss)
to parse Harp data files into RSS feeds and a [small script](https://github.com/trodrigues/trodrigues.net/blob/master/bin/makepost.js)
to create posts and add them to that same data file.

Deployment is simply a push to a deploy branch, inspired by this [clock
post](http://clock.co.uk/tech-blogs/deploying-nodejs-apps), with a
post-receive hook which runs `npm run-script build` and dumps all the
files into the public directory. Simple.
