<?php

namespace App\Actions;

use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final class UpdateProductAction
{
    /**
     * execute an action
     */
    public function handle(User $user, Product $product, array $attributes): void
    {
        DB::transaction(function () use ($user, $product, $attributes) {
            $product->updateOrFail([
                'user_id' => $user->id,
                'name' => $attributes['name'],
                'description' => $attributes['description'],
                'status' => $attributes['status'],
                'price' => $attributes['price'],
                'stock' => $attributes['stock'],
            ]);
        });

        // broadcast(new ProductUpdated($product))->toOthers();
    }
}
