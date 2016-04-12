PWD=$(shell pwd)

run:
	./tiny.js --config=$(PWD)/config.yml

log:
	tail -f logs/*
