<?php

namespace App\Actions;

use App\Enum\ProductStatus;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final class CreateProductAction
{
    /**
     * Create a new class instance.
     */
    public function __construct(public Product $product)
    {
        //
    }

    /**
     * Execute the action.
     */
    public function handle(User $user, array $attributes): void
    {
        DB::transaction(function () use ($user, $attributes) {
            $this->product->create([
                'user_id' => $user->id,
                'name' => $attributes['name'],
                'description' => $attributes['description'],
                'status' => ProductStatus::AVAILABLE,
                'price' => $attributes['price'],
                'stock' => $attributes['stock'],
            ]);
        });

        // broadcast(new ProductCreated($product))->toOthers();
    }
}
