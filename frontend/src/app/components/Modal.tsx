import React, { useEffect } from 'react';
import ButtonPersona from './ButtonPersona';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    expense: {
        _id: string;
        name: string;
        value: number;
        type: string;
        date: string;
    };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, expense }) => {
    useEffect(() => {
        if (isOpen) {
            localStorage.setItem('actualExpense', expense._id);
        }
    }, [isOpen, expense._id]);

    if (!isOpen) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onClose();
    };

    const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return (
        <div className="font-mono fixed inset-0 flex items-center justify-center z-50 bg-black-persona bg-opacity-50" onClick={handleOverlayClick}>
            <div className="bg-black-persona text-yellow-persona p-6 rounded-lg shadow-lg w-80" onClick={handleModalClick}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-persona hover:text-deep-red-persona"
                >
                    <i className="fa-solid fa-xmark" />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">Detalhes da dívida</h2>
                <div className="mb-4 flex flex-col items-center justify-center text-center">
                    <p><b>Nome:</b> {expense.name}</p>
                    <p><b>Valor:</b> {expense.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <p><b>Categoria:</b> {expense.type}</p>
                    <p><b>Data:</b> {formatDate(expense.date)}</p>
                    {expense.value > 0 ? (
                        <div className="mr-1 flex h-10 w-10 items-center text-black-persona justify-center rounded-full bg-green-500">
                            <i className="fa-regular fa-thumbs-up" />
                        </div>
                    ) : (
                        <div className="mr-1 flex h-10 w-10 items-center text-black-persona  justify-center rounded-full bg-red-500">
                            <i className="fa-regular fa-thumbs-down" />
                        </div>
                    )}
                </div>
                <button
                    className="w-full p-2 rounded-lg"
                >
                    <a href={`/expense`} >
                        <ButtonPersona img1="./fonts/editar.png" img2="./fonts/editar2.png" />
                    </a>
                </button>
            </div>
        </div>
    );
};

export default Modal;
