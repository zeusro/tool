# Makefile for tool project
#

# ISO 8601 format with timezone, precision to seconds: YYYY-MM-DDTHH:MM:SS+TZ:TZ
now := $(shell date +%Y-%m-%dT%H:%M:%S%z)

# .PHONY: help auto_commit

# Auto commit: add all changes, commit with timestamp, pull and push
auto_commit:
	git add .
	# 需要注意的是，每行命令在一个单独的shell中执行。这些Shell之间没有继承关系。
	git commit -am "$(now)"
	git pull
	git push

# Put it first so that "make" without argument is like "make help".
help:
	@echo "Available targets:"
	@echo "  auto_commit  - Add, commit, pull and push all changes with timestamp"
	@echo "  help         - Show this help message"
