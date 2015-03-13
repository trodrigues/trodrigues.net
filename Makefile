.PHONY: post remove start build help

help:
	cat Makefile

clean:
	rm -rf www

post:
	./bin/makepost.js

remove:
	./bin/removepost.js

start:
	harp server --port 6050

build:
	harp compile
