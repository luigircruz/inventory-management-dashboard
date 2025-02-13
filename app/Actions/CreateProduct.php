<?php

namespace App\Actions;

use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final class CreateProduct
{
    /**
     * Execute the action.
     */
    public function handle(User $user, array $attributes): void
    {
        DB::transaction(function () use ($user, $attributes) {
            Product::create([
                'user_id' => $user->id,
                'name' => $attributes['name'],
            ]);
        });

        // broadcast(new ProductCreated($product))->toOthers();
    }
}
