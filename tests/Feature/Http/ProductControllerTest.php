<?php

use App\Models\Product;
use App\Models\User;

it('can create a product', function () {
    $user = User::factory()->create()->fresh();

    $product = Product::factory()->for($user)->create()->fresh();

    $response = $this->actingAs($user)->post(route('products.store'), $product->toArray());
    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('products.index'));

    // $this->assertDatabaseHas(Product::class, $product->toArray());
});
