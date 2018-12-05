---
layout: post
title: Front end development with docker
date: 2015-02-08
---

*This was originally published on 8 Feb 2015 in my old blog.*

*A more recent example of this idea based on Docker for Mac can be found at [https://github.com/trodrigues/docker-frontend-example](https://github.com/trodrigues/docker-frontend-example)*

Recently I decided to figure out how [Docker](http://docker.io/) would fit into my workflow
as a front end developer.

I've always loved the idea of having easily reproducible development
environments and keeping them as close to production as possible, and
have tried to achieve that for things that I've worked with recently.
Given that this is one of the main aspects of Docker, I've naturally
been interested in it since it came along.

At my [current workplace](http://contentful.com/) we use a Vagrant VM
with a shell script for provisioning (soon to be converted into Chef to
make it close to the production deployment procedure), which works quite
well. Everyone gets the same environment, when something gets screwed up
you can destroy the whole thing and recreate it from scratch, and when
something needs to be updated it's easy for everyone to do it.

However, our infrastructure has grown over time, and with the
proliferation of microservices, the idea of rebuilding the whole thing
because of a minor update seems a bit wasteful. Which is why we've been
thinking that containerisation might be something we want to seriously
consider.

While I've read a lot about Docker and experimented with it before, I had
never really tried to actually setup a project with it, and
as part of a new pet project I decided to give it a try and see how it
would fit in with a front end development workflow, which potentially
will also be useful knowledge if we decide to go the container way at
my workplace.

I won't explain much about what Docker is and how it works, so if you'd
like to learn more about that, have a look at their [User Guide](https://docs.docker.com/userguide/) and
[interactive tutorial](https://www.docker.com/tryit/).

Also, given that I'm fairly inexperienced with Docker and while I've
done a lot of reading and research, there might be obvious and glaring
mistakes on my approach, or things that could be done better, so please
do let me know if there is any way I could improve upon this approach.

## The App

While the workflow I'm about to describe here should work for any front
end development setup, I think it's a good idea to first explain what
I'm trying to build and how it'll fit into a container setup.

First of all, what's a common front end development setup nowadays?
There's all sorts of build systems which can be used to run your code in
development and build it for production, but most of these follow the
principle of having some kind of file watcher for development,
recompiling JS, CSS and whatever else necessary, and then having a
separate task for building a production ready version of those assets.

Separately, there is some server (some times part of the developer build
chain, some times separate) that serves those files for development.

In this specific case I have a very simple Node.js app, which exists
solely for the purpose of doing the "OAuth dance" with an external
service, so that users can login with their personal accounts on that
3rd party service and then get back to the app.

Other than that, all the app does is serve a client side only single
page app, which I'm serving from the Node.js app directly for simplicity.

To be fair, using containers or even a VM here is kind of overkill, but
this is mostly for experimentation and demonstration purposes, and this
approach would fit well into any kind of infrastructure.

So anyway, that's one container right there, for the Node.js app. And
that's pretty much the only thing I want to ship and run in production.

Now, I could be completely lazy and just add all my development tools to
that container and be done with it. I could then run Docker in
interactive mode, run a file watcher with my build chain in there and
that would work.

And pretty much all the articles I've seen so far where people use
Docker for front end development follow that pattern. Given that one of
the principles of using containers is keeping them as lightweight and
simple as possible, that approach goes a bit against that point.

So I'd like to avoid shipping anything that isn't necessary which means
I want to keep the front end build chain outside of that container. In
fact, that container shouldn't even have to worry with having to build
those assets for production.

## The Setup

The way building new containers with Dockerfiles works is usually something
like this:

- Choose a base image
- Define the work directory where things will run
- Tell Docker how to copy your app context (which is the
directory where your Dockerfile lives) into the container
- Expose ports
- Define the commands which install whatever you want to run in the
container
- Define the entrypoint command, which is usually the main process you
want to run in the container

Alternatively or in addition, you can setup [data volumes](https://docs.docker.com/userguide/dockervolumes/). These can come
from other containers, or from your local filesystem. The former is a
way of sharing data across containers, where as the latter, while it can
serve the same purpose, seems to be more often used for development
purposes.

A thing we need to understand is that when in a Dockerfile we define
that some data will be copied into the container, that only happens at
build time. If you want to detect file changes while the container is
running, you need to use a data volume. It's essentially like a shared
directory in a VM. If you're using boot2docker on a Mac it's actually a
shared directory on a VM, because that's what boot2docker is (and that
poses a problem which I'll get to further ahead).

With all this in mind, there were a few limitations that made
this development setup not so obvious:

- You can only have one Dockerfile per directory
- You can only copy files into the container which are already inside the current context
- You can only mount volumes with absolute paths

After a bunch of fiddling around I came up with the following setup,
which is actually rather simple (but maybe a bit hacky):

    myproject/
    |-- Dockerfile
    |-- app
    |   |-- Dockerfile
    |   |-- Makefile
    |   |-- app.js
    |   |-- build
    |   |   |-- ...
    |   |-- package.json
    |   |-- public
    |       |-- ...
    |-- fig.yml

- The top level Dockerfile defines the development toolchain container
- `app/Dockerfile` defines the server container, and it's what we want to ship
to production
- There's a `fig.yml` which we use for [Fig](http://www.fig.sh/) to start everything up together

Let's start with the server Dockerfile, which lives inside the app
directory:

    FROM nodesource/node:trusty
    EXPOSE 6001
    COPY . /src
    WORKDIR /src
    RUN npm install --prod
    CMD /usr/bin/node app.js

That's fairly simple. It uses a base image with Node.js installed,
copies the current context into the /src directory, installs
dependencies and starts the server.

Note how we're using the `--prod` flag for `npm install`, which ensures
we're not installing anything necessary for development.

A thing to notice is that `app.js` serves the `index.html` file and
everything under `build` as static files.

Now let's have a look at the top level file for the build toolchain:

    FROM nodesource/node:trusty
    COPY app/ /src
    WORKDIR /src
    RUN npm install -g watchy
    RUN npm install

We're using the same base image, copying the same data (which in this
case is inside the app directory), installing different dependencies
(without the `--prod` flag npm installs `devDependencies` by default).
We're not running any command as an entrypoint here, because we want to
use this container not just for our development setup, but also to build
the assets for production. More on that ahead.

Now, remember how I mentioned earlier that we want to use volumes in
order to check what files changed and reload the code appropriately?

We could've specified the volumes in the Dockerfile, but because they're
not necessary for production we want to keep them out of there.

A thing that got me is that if you use volumes and have a RUN command in
your Dockerfile, those RUN commands can't really operate on data that
comes from the volumes, because they will not be available at that
moment. This is why we need to make sure that we still use the COPY
command to get the necessary data there at build time.

So how do we specify the volumes? Remember that `fig.yml` file up there?
We're going to use fig to help us start all of our containers at once,
but also to setup our volumes:

    projectserver:
      build: app/
      ports:
      - "6001:6001"
      volumes:
      - app/:/src
    projectclient:
      build: .
      volumes:
      - app/:/src
      entrypoint: ["/usr/bin/watchy", "-w", "public/javascripts", "--", "/usr/bin/make", "all"]

Here we're also specifying the command which runs the file watcher,
because we only want to use fig for development.

You start everything with `fig up` and your development environment is
up and running.

## Production deployments

I didn't spend a lot of time trying to figure this one out, but the idea
is also simple. We should have a task in that Makefile that builds assets
for production, which we can run in the context of our development
container, such as:

    docker run -ti myproject_projectclient make production

Then, if you rebuild your production container that data should be ready
for it to copied into it's own context.

## The caveat(s)

Now, this is all very nice and adaptable to different setups. It's just
one extra container which you use for managing your front end development
toolchain.

However, at the moment there is one major issue with this setup, which only
applies if you're running a Mac with boot2docker but it's nevertheless a
show stopper.

If you ever did front end development with Vagrant/Virtualbox and shared
directories, you've certainly come across the issue with file change
detection being too slow if you're using the default file sharing
mechanism in Virtualbox. The way to usually fix this is to [use NFS](https://docs.vagrantup.com/v2/synced-folders/nfs.html), and
maybe [tweak a few options](https://www.jverdeyen.be/vagrant/speedup-vagrant-nfs/) in order to speed things up.

It works fine, we use it on our development VM at work, but at the
moment it's not possible to change that with boot2docker, or at least
not trivial. Here's a [whole thread](https://github.com/boot2docker/boot2docker/issues/64) on that issue
where some people have managed to get it working, but it doesn't seem
like there is yet a straightforward out of the box solution for anyone.

Apart from that, there's a bunch of other things that could've been more
straightforward. While I don't particularly appreciate the overly
agressive tone of [this article](http://iops.io/blog/docker-hype/) and a
lot of the issues pointed out don't apply to this use case, I
particulary agree with the part about the Dockerfile. It feels like this
should and could be simpler, specially if the idea from the outset is to
have many small containers for each service.

## In conclusion

This was an interesting experiment but until a way to fix the NFS
file share issue comes along, I probably won't be using Docker for any
kind of front end development.

However, this is what I see as possibly the best approach to setup a
Docker development environment for the front end, in a way that lets you
take advantage of Docker and easily integrate with existing, more
complex infrastructures.