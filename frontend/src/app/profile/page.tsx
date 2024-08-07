'use client';

import Header from '../components/Header';
import { fetchData } from '../../api/api';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import ButtonPersona from '../components/ButtonPersona';

interface User {
    _id?: string;
    username: string;
    create_date: Date;
    last_login: Date;
}

export default function Profile() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<User>({
        username: '',
        create_date: new Date(),
        last_login: new Date(),
    });
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const actualUser = localStorage.getItem('user_id');
                if (actualUser) {
                    const params = { id: actualUser }
                    const user = await fetchData(`/user/user`, params);
                    setCurrentUser(user);
                    setFormData({
                        username: user.username,
                        create_date: user.create_date,
                        last_login: user.last_login,
                    });
                }
            } catch (error: any) {
                toast.error('Erro ao carregar dados');
            }
        };

        fetchCurrentUser();
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
            if (isEditing && currentUser?._id) {
                const params = { id: currentUser._id }
                await fetchData(`/user/user`, params, 'PUT', formData);
            }
            toast.success('Operação realizada com sucesso!');
            setIsEditing(false);
        } catch (error: any) {
            toast.error('Houve algum erro, por favor tente novamente mais tarde');
        }
    };

    const handleEditToggle = () => {
        setIsEditing(true);
    };

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="flex flex-col min-h-screen font-mono text-deep-yellow-persona">
            <Header />
            <main className="flex-grow p-10">
                <div className="bg-black-persona p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto mt-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        {isEditing ? 'Editar Perfil' : 'Meu Perfil'}
                    </h2>
                    {!isEditing ? (
                        <div className="p-6 text-center">
                            <p className="mb-4"><strong>Nome:</strong> {formData.username}</p>
                            <p className="mb-4"><strong>Data de cadastro:</strong> {formatDate(formData.create_date)}</p>
                            <p className="mb-4"><strong>Último login:</strong> {formatDate(formData.last_login)}</p>
                            <ButtonPersona onClick={handleEditToggle} img1="./fonts/editar.png" img2="./fonts/editar2.png" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <label>
                                Nome:
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 p-2 border rounded"
                                    required
                                />
                            </label>
                            <button
                                type="submit"
                                className="text-white p-2 rounded-lg"
                            >
                                <div className="text-center">
                                    <ButtonPersona img1="./fonts/editar.png" img2="./fonts/editar2.png" />

                                </div>
                            </button>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
}
