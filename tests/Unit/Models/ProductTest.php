<?php

use App\Models\Product;
use App\Models\User;

test('to array', function () {
    $user = User::factory()->create()->fresh();
    $product = Product::factory()->for($user)->create()->fresh();

    expect(array_keys($product->toArray()))->toBe([
        'id',
        'user_id',
        'name',
        'status',
        'description',
        'price',
        'aisle',
        'stock',
        'image',
        'published_at',
        'created_at',
        'updated_at',
    ]);
});
