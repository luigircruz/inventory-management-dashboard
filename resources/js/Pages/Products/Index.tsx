import InputError from '@/Components/InputError';
import Product from '@/Components/Product';
import { Button } from '@/components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, Product as ProductType } from '@/types';
import { Head, useForm } from '@inertiajs/react';

export default function Index({
    auth,
    products,
}: {
    auth: PageProps['auth'];
    products: ProductType[];
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        description: '',
        price: 0,
        stock: 0,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ auth });
        post(route('products.store'), { onSuccess: () => reset() });
    };

    return (
        <Authenticated>
            <Head title="Products" />

            <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoFocus
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Product Description</Label>
                        <Input
                            id="description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            autoComplete="description"
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Product Price</Label>
                        <Input
                            id="price"
                            name="price"
                            value={data.price}
                            className="mt-1 block w-full"
                            autoComplete="price"
                            onChange={(e) =>
                                setData('price', Number(e.target.value))
                            }
                            required
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stock">Product Stock</Label>
                        <Input
                            id="stock"
                            name="stock"
                            value={data.stock}
                            className="mt-1 block w-full"
                            autoComplete="stock"
                            onChange={(e) =>
                                setData('stock', Number(e.target.value))
                            }
                            required
                        />
                        <InputError message={errors.stock} className="mt-2" />
                    </div>
                    <Button className="mt-4" disabled={processing}>
                        Save
                    </Button>
                </form>

                <div className="mt-6 divide-y rounded-lg bg-white shadow-sm">
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </Authenticated>
    );
}
