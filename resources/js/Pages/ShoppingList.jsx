import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/outline';

function ShoppingList() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        axios.get('/items')
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    const addItem = () => {
        if (!newItem) return;

        axios.post('/items', { name: newItem })
            .then(response => setItems([...items, response.data]))
            .catch(error => console.error(error));

        setNewItem('');
    };

    const deleteItem = (id) => {
        axios.delete(`/items/${id}`)
            .then(() => setItems(items.filter(item => item.id !== id)))
            .catch(error => console.error(error));
    };

    return (
        <>
        <Head title="Alışveriş Listem" />
        <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold mb-4 text-center">Alışveriş Listem</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Listeye Ekle"
                className="border rounded p-2 w-full mb-2"
            />
            <button onClick={addItem} className="flex items-center justify-center bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600">
                <PlusCircleIcon className="h-5 w-5 mr-1" />
                    Ekle
            </button>
            <ul className="mt-4">
                {items.map(item => (
                    <li key={item.id} className="flex justify-between items-center border-b py-2">
                        <span>{item.name}</span>
                        <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700 flex items-center">
                            <TrashIcon className="h-5 w-5 mr-1" />
                            Sil
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </>
    );
}

export default ShoppingList;
