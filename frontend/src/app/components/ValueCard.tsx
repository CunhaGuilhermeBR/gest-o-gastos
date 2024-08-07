import React from 'react';
import Modal from './Modal';

interface ValueCardProps {
    _id: string;
    name: string;
    value: number;
    type: string;
    date: string;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ValueCard: React.FC<ValueCardProps> = ({ _id, value, name, type, date, isModalOpen, openModal, closeModal }) => {
    const monthNames: { [key: number]: string } = {
        1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril', 5: 'Maio', 6: 'Junho',
        7: 'Julho', 8: 'Agosto', 9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro'
    };

    const returnNameMonth = (month: number) => {
        return monthNames[month] || 'Mês inválido';
    };

    return (
        <>
            <div
                className="font-mono col-span-2 flex items-center justify-between rounded-full bg-black-persona text-deep-yellow-persona transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={openModal}
            >
                <div className="ml-2 mr-2"> <b> {name}:</b> {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </div>
                <div className="flex items-center">
                    <div className="mr-2 font-bold">
                        {returnNameMonth(new Date(date).getMonth() + 1)}
                    </div>
                    {value > 0 ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full text-black-persona bg-green-500">
                            <i className="fa-regular fa-thumbs-up" />
                        </div>
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center text-black-persona rounded-full bg-red-500">
                            <i className="fa-regular fa-thumbs-down" />
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                expense={{ _id, name, value, type, date }}

            />
        </>
    );
};

export default ValueCard;
