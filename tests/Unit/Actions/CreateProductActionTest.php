<?php

use App\Actions\CreateProduct;
use App\Models\Product;
use App\Models\User;

it('creates a new product', function () {
    $user = User::factory()->create();
    $action = app(CreateProduct::class);

    $action->handle($user, [
        'name' => 'Product Name',
        'description' => 'Product Description',
        'price' => 1000,
        'stock' => 10,
    ]);

    $this->assertDatabaseHas(Product::class, [
        'user_id' => $user->id,
        'name' => 'Product Name',
        'description' => 'Product Description',
        'status' => 'available',
        'price' => 1000,
        'stock' => 10,
    ]);
});
