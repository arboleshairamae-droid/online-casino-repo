The API stores users and access tokens in Google Sheets through the Apps Script web app in `google-apps-script/Code.gs`. Open Apps Script from the target spreadsheet, paste that file's code, and run `setupLuckyVaultSheets` once.
In Apps Script project settings, add a Script Property named `API_KEY` with a long random secret. Set `GOOGLE_APPS_SCRIPT_API_KEY` to the same value in `backend/.env`, and set `GOOGLE_APPS_SCRIPT_URL` to the web app URL. Deploy the script as a Web app, execute as yourself, and allow access to anyone; the API key protects its POST operations. After changing the script, deploy a new version and update the URL in `.env` if Google gives you a different one. Restart Laravel after changing environment values.

The web app's GET endpoint is a health check. POST requests use JSON actions (`rows`, `append`, `update`) and require the API key. Laravel's relational database migrations are not used by these API routes; sessions and cache use local files, and queued work runs synchronously.
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Google Sheets storage

The API stores users and access tokens in Google Sheets through the Apps Script web app in `google-apps-script/Code.gs`. Open Apps Script from the target spreadsheet, paste that file's code, and run `setupLuckyVaultSheets` once.

Create three tabs with these exact names and first-row headers:

- `Users`: `id`, `name`, `email`, `password`, `balance`, `created_at`
- `Activities`: `id`, `user_id`, `activity_type`, `description`, `credits`, `created_at`, `updated_at`
- `Tokens`: `token_hash`, `user_id`, `created_at`

In Apps Script project settings, add a Script Property named `API_KEY` with a long random secret. Set `GOOGLE_APPS_SCRIPT_API_KEY` to the same value in `backend/.env`; `GOOGLE_APPS_SCRIPT_URL` is the deployed web app URL. Deploy the script as a Web app, execute as yourself, and allow access to anyone; the API key protects its POST operations. After changing the script, deploy a new version and update the URL in `.env` if Google gives you a different one. Restart Laravel after changing environment values.

The web app's GET endpoint is a health check. POST requests use JSON actions (`rows`, `append`, `update`) and require the API key. Laravel's relational database migrations are not used by these API routes; sessions and cache use local files, and queued work runs synchronously.

Google Sheets is suitable here for a small demo, not a production database: reads and writes are slower, concurrent updates are not transactional, and the API has quotas. Passwords are hashed and API tokens are stored as hashes, but anyone with Editor access to the spreadsheet can read or change account data.
