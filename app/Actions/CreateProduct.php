<?php

namespace App\Actions;

use App\Models\User;

final class CreateProduct
{
    /**
     * Execute the action.
     */
    public function handle(User $user, array $attributes): void
    {
        // Handle the action...
        // DB::transaction(function () use ($user, $attributes) {
            // Product::create([
            //     'user_id' => $user->id,
            //     'name' => $attributes['name'],
            //     'price' => $attributes['price'],
            // ]);
        // });

        // broadcast(new ProductCreated($product))->toOthers();
    }
}