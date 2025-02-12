<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        $this->configureCommands();
        $this->configureModels();
        $this->configureDates();
    }

    /**
     * Configure the application's commands.
     */
    public function configureCommands(): void
    {
        DB::prohibitDestructiveCommands(
            $this->app->environment('production')
        );
    }

    /**
     * Configure the application's models.
     */
    public function configureModels(): void
    {
        Model::shouldBeStrict();
        Model::unguard();
    }

    /**
     * Configure the application's dates.
     */
    public function configureDates(): void
    {
        Date::use(CarbonImmutable::class);
    }
}
