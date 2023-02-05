#!bin/bsdh
mkdir /etc/nginx/sites-available
mkdir /etc/nginx/sites-enabled

mv /etc/nginx/test.conf /etc/nginx/sites-available/test.conf
ln -s /etc/nginx/sites-available/test.conf /etc/nginx/sites-enabled/test.conf

mv /etc/nginx/default.conf /etc/nginx/conf.d/default.conf

sed '$ d' -i /etc/nginx/nginx.conf
echo "    include /etc/nginx/sites-enabled/*.conf;" >> /etc/nginx/nginx.conf
echo "    server_names_hash_bucket_size 64;" >> /etc/nginx/nginx.conf
echo "}" >> /etc/nginx/nginx.conf

