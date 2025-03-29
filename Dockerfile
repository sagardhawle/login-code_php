FROM php:8.1-apache

RUN docker-php-ext-install pdo pdo_mysql

COPY . /var/www/html/
COPY php/ /var/www/html/php/

RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite
