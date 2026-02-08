<?php

/**
 * Basic configuration for API/Admin.
 * Override values via environment variables in cPanel.
 */
return [
    'db' => [
        'host' => getenv('DB_HOST') ?: 'localhost',
        'name' => getenv('DB_NAME') ?: 'hidromont_db',
        'user' => getenv('DB_USER') ?: 'hidromont_user',
        'pass' => getenv('DB_PASS') ?: 'change_me',
    ],
    'cors' => [
        // Comma-separated origins, e.g. "https://hidromontjovancic.rs,https://www.hidromontjovancic.rs,https://your-vercel.app"
        'origins' => array_filter(array_map('trim', explode(
            ',',
            getenv('CORS_ORIGINS') ?: 'https://hidromontjovancic.rs,https://www.hidromontjovancic.rs'
        ))),
    ],
    'uploads' => [
        'dir' => getenv('UPLOAD_DIR') ?: '/home/hidromont/public_html/uploads/projects',
        'base_url' => getenv('UPLOAD_BASE_URL') ?: 'https://api.hidromontjovancic.rs/uploads/projects',
        'max_size' => (int) (getenv('UPLOAD_MAX_BYTES') ?: 32 * 1024 * 1024),
    ],
    'uploads_products' => [
        'dir' => getenv('PRODUCT_UPLOAD_DIR') ?: '/home/hidromont/public_html/uploads/products',
        'base_url' => getenv('PRODUCT_UPLOAD_BASE_URL') ?: 'https://api.hidromontjovancic.rs/uploads/products',
        'max_size' => (int) (getenv('PRODUCT_UPLOAD_MAX_BYTES') ?: 32 * 1024 * 1024),
    ],
    'mail' => [
        'orders_to' => getenv('ORDER_NOTIFY_EMAIL') ?: 'hidromontjovancic@gmail.com',
        'from' => getenv('MAIL_FROM') ?: 'noreply@hidromontjovancic.rs',
        'from_name' => getenv('MAIL_FROM_NAME') ?: 'Hidromont Jovancic',
        'subject_prefix' => getenv('MAIL_SUBJECT_PREFIX') ?: '[Hidromont] ',
    ],
    'cache' => [
        'dir' => getenv('CACHE_DIR') ?: (__DIR__ . '/cache'),
        'ttl' => (int) (getenv('CACHE_TTL') ?: 120),
    ],
    'debug' => getenv('APP_DEBUG') === '1',
];
