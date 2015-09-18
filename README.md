Daisy web integration
=====================

This application is used to integrate Daisy content into DSV's
Polopoly-based web site.

Installation
------------

Prerequisites: PHP (>= 5.4), [Composer](https://getcomposer.org/).

1. Check out the repository:

        git clone https://github.com/dsv-su/daisyweb

2. Run `composer install --no-dev` in the checked-out directory.

3. Create a `daisy_api.json` file in the checked-out directory. See
   <https://github.com/dsv-su/daisy-api-client-php> for an example.

4. Copy `semesters.conf.example` to `semesters.conf` and edit it
   accordingly.

5. Make the cache directory writable by the web server:

        chgrp www-data daisyweb/cache
        chmod g+w daisyweb/cache

6. Export `daisyweb/public` to the web:

        Alias /daisyweb /path/to/daisyweb/public

Technical details
-----------------

The application uses daisy-api-client-php to interface with Daisy. See
<https://github.com/dsv-su/daisy-api-client-php>.

The actual integration into Polopoly pages is done using Javascript,
by making cross-domain XHR requests to the PHP scripts in the public/
subdirectory to fetch the parts of a web page that is dynamically
generated. The Javascript code that fetches page fragments from the
PHP scripts is located at <http://www2.dsv.su.se/js/dsv-pp.js>.

The scripts use Twig as the template language. See
<http://twig.sensiolabs.org/>.

Footable is used to make the tables sortable and responsive. Gulp is
used to copy and minify CSS and Javascript from Footable. Footable is
installed using Bower.

There is a test suite that uses [Codeception](http://codeception.com/)
to test the application for acceptance (i.e., the PHP pages work and
show something that looks correct). You can run the test suite with
`vendor/bin/codecept run`. It is a good idea to do so after making
changes.
