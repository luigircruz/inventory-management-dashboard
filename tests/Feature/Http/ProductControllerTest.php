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
});

it('can update a product', function () {
    $user = User::factory()->create()->fresh();

    $product = Product::factory()->for($user)->create()->fresh();

    $response = $this->actingAs($user)->put(route('products.update', $product), $product->toArray());
    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('products.index'));
});