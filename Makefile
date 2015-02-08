.PHONY: post remove start build help

clean:
	rm -rf www

help:
	cat Makefile

post:
	./bin/makepost.js

remove:
	./bin/removepost.js

start:
	harp server

build:
	harp compile
