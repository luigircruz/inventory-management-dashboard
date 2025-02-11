import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Product from '@/Components/Product';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, products }: PageProps) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
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
