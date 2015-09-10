Daisy web integration
=====================

This application is used to integrate Daisy content into DSV's
Polopoly-based web site.

Installation
------------

1. Check out the repository:

        git clone https://github.com/dsv-su/daisyweb

2. Create a `daisy_api.json` file in the root working directory of the
   checked-out repository. See
   <https://github.com/dsv-su/daisy-api-client-php> for an example.

3. Copy `semesters.conf.example` to `semesters.conf` and edit it
   accordingly.

4. Make the cache directory writable by the web server:

        chgrp www-data daisyweb/cache
        chmod g+w daisyweb/cache

5. Export `daisyweb/public` to the web:

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
