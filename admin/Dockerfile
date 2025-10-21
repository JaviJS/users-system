FROM php:8.3-fpm

ARG user=javijs
ARG uid=1000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    supervisor \
    nginx \
    build-essential \
    openssl \
    libcurl4-openssl-dev \
    libssl-dev \
    libonig-dev \
    libicu-dev \
    g++ \
    pkg-config

RUN docker-php-ext-install gd pdo pdo_mysql sockets zip bcmath intl

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

WORKDIR /var/www/app

# If you need to fix ssl
COPY ./config/openssl.cnf /etc/ssl/openssl.cnf

# Set the correct permissions for the storage and bootstrap/cache directories
RUN chown -R $uid:$uid /var/www/app && \
    chmod -R 775 /var/www/app

    
# copy supervisor configuration
COPY ./config/supervisord.conf /etc/supervisord.conf

# run supervisor
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]