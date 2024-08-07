'use client';

import Header from '../components/Header';
import { fetchData } from '../../api/api';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import ButtonPersona from '../components/ButtonPersona';

interface Expense {
    _id?: string;
    name: string;
    value: number;
    transaction_date: string;
    type: string;
    user_id: string;
}

export default function Expense() {
    const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
    const [formData, setFormData] = useState<Expense>({
        name: '',
        value: 0,
        transaction_date: '',
        type: '',
        user_id: localStorage.getItem('user_id') || ''
    });
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const fetchCurrentExpense = async () => {
            try {
                const actualExpenseId = localStorage.getItem('actualExpense');
                if (actualExpenseId) {
                    setIsEditing(true);
                    const params = { id: actualExpenseId }
                    const expense = await fetchData(`/expense/expense`, params);
                    setCurrentExpense(expense);
                    setFormData({
                        name: expense.name,
                        value: expense.value,
                        transaction_date: expense.transaction_date,
                        type: expense.type,
                        user_id: expense.user_id
                    });
                } else {
                    setIsEditing(false);
                }
            } catch (error: any) {
                toast.error('Erro ao carregar dívida atual')
            }
        };

        fetchCurrentExpense();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isEditing && currentExpense?._id) {

                const params = { id: currentExpense._id }
                await fetchData(`/expense/expense`, params, 'PUT', formData);
            } else {
                await fetchData('/expense/expense', undefined, 'POST', formData);
            }
            toast.success('Operação realizada com sucesso!');
            setFormData({
                name: '',
                value: 0,
                transaction_date: '',
                type: '',
                user_id: localStorage.getItem('user_id') || ''
            });
        } catch (error: any) {
            toast.error('Houve algum erro, por favor tente novamente mais tarde');
            console.log(error);
        }
    };

    return (
        <div className="font-mono text-deep-yellow-persona">
            <Header />
            <div className='p-10'>
                <div className="bg-black-persona p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-6">
                    <h2 className=" text-2xl font-bold mb-4 text-center">
                        {isEditing ? 'Editar Movimentação Financeira' : 'Criar Nova Movimentação Financeira'}
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <label>
                            Nome:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="block w-full mt-1 p-2 border rounded"
                                required
                            />
                        </label>
                        <label>
                            Valor:
                            <input
                                type="number"
                                name="value"
                                value={formData.value}
                                onChange={handleInputChange}
                                className="block w-full mt-1 p-2 border rounded"
                                required
                            />
                        </label>
                        <label>
                            Categoria:
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="block w-full mt-1 p-2 border rounded"
                                required
                            >
                                <option value="" disabled>Selecione a categoria...</option>
                                <option value="Contas">Contas</option>
                                <option value="Educação">Educação</option>
                                <option value="Gastos mensais">Gastos mensais</option>
                                <option value="Lazer">Lazer</option>
                                <option value="Outros">Outros</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Transporte">Transporte</option>
                            </select>
                        </label>
                        <label>
                            Data:
                            <input
                                type="date"
                                name="transaction_date"
                                value={formData.transaction_date}
                                onChange={handleInputChange}
                                className="block w-full mt-1 p-2 border rounded"
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className="text-white p-2 rounded-lg"
                        >
                            {isEditing ?
                                <div className="text-center">
                                    <ButtonPersona img1="./fonts/editar.png" img2="./fonts/editar2.png" />

                                </div> :
                                <div className="text-center">
                                    <ButtonPersona img1="./fonts/criar.png" img2="./fonts/criar2.png" />

                                </div>}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}
