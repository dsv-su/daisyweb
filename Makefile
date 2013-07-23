all: js/staff-full.js staff.html

js/staff-full.js: FooTable/dist/footable.min.js FooTable/dist/footable.sort.min.js FooTable/js/footable.filter.js js/staff.js
	cat $^ > $@

staff.html: staff.php
	php $< > $@

.PHONY: all
