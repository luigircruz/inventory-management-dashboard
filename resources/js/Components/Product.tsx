import { Product as ProductType } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import Dropdown from './Dropdown';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';

dayjs.extend(relativeTime);

export default function Product({ product }: { product: ProductType }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(route('products.update', product.id), {
            onSuccess: () => setEditing(false),
        });
    };

    return (
        <div className="flex space-x-2 p-6">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 -scale-x-100 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-gray-800">
                            {product.user.name} ${product.price} -{' '}
                            {product.stock} in stock: {product.description}
                        </span>
                        <small className="ml-2 text-sm text-gray-600">
                            {dayjs(product.created_at).fromNow()}
                        </small>
                        {product.created_at !== product.updated_at && (
                            <small className="text-sm text-gray-600">
                                {' '}
                                &middot; edited
                            </small>
                        )}
                    </div>
                    {product.user.id === auth.user.id && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>
                                <Dropdown.Link
                                    as="button"
                                    href={route('products.destroy', product.id)}
                                    method="delete"
                                >
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
                {editing ? (
                    <form onSubmit={submit}>
                        <textarea
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-4 w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        ></textarea>
                        <InputError message={errors.name} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button
                                className="mt-4"
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="mt-4 text-lg text-gray-900">{product.name}</p>
                )}
            </div>
        </div>
    );
}
