import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Product from '@/Components/Product';
import TextInput from '@/Components/TextInput';
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
                <form onSubmit={submit}>
                    <div className="space-y-2">
                        <InputLabel htmlFor="name" value="Product Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="space-y-2">
                        <InputLabel
                            htmlFor="description"
                            value="Product Description"
                        />
                        <TextInput
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
                        <InputLabel htmlFor="price" value="Product Price" />
                        <TextInput
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
                        <InputLabel htmlFor="stock" value="Product Stock" />
                        <TextInput
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
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Save
                    </PrimaryButton>
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
