all: js/staff.js staff.html

js/staff.js: FooTable/dist/footable.min.js FooTable/dist/footable.sort.min.js FooTable/js/footable.filter.js js/staff-table.js
	cat $^ > $@

staff.html: staff.php
	php $< > $@

.PHONY: all
