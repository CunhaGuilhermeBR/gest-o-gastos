'use client';

import Header from '../components/Header';
import ValueCard from '../components/ValueCard';
import { fetchData } from '../../api/api';
import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

interface Expense {
  _id: string;
  name: string;
  value: number;
  transaction_date: string;
  type: string;
}

interface AggregateExpenses {
  year: string;
  total: number;
  month: string;
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [aggregateExpenses, setAggregateExpenses] = useState<AggregateExpenses[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 10;
  const router = useRouter();


  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
          router.push('/')
        };
        const params = {
          user_id
        };
        const [expensesResult, aggregateResult] = await Promise.all([
          fetchData('/expense/expenses', params),
          fetchData('/expense/aggregate', params)
        ]);

        setExpenses(expensesResult);
        setAggregateExpenses(aggregateResult);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchDataFromApi();
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = expenses?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const totalPages = Math.ceil((expenses?.length || 0) / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const Pagination = () => (
    <div className="flex justify-center mt-4 font-mono text-deep-yellow-persona">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-black-persona rounded hover:scale-105 cursor-pointer font-bold"
      >
        <i className="fa-solid fa-backward-fast" />
      </button>
      <span className="px-4 py-2 font-bold">{currentPage} / {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-black-persona rounded hover:scale-105 cursor-pointer font-bold"
      >
        <i className="fa-solid fa-forward-fast" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-10 z-10">
        <div className="mb-6 background-image-opacity grid grid-cols-1 gap-4 rounded-md p-6">
          {currentItems.length > 0 && (
            <Carousel data={aggregateExpenses} />
          )}
          <h1 className='font-mono text-2xl font-bold'>
            Gastos <i className="fa-solid fa-ghost" />
          </h1>
          {currentItems.length > 0 ? (
            currentItems.map(expense => (
              <ValueCard
                _id={expense._id}
                key={expense._id}
                value={expense.value}
                type={expense.type}
                name={expense.name}
                date={expense.transaction_date}
                isModalOpen={openModalId === expense._id}
                openModal={() => setOpenModalId(expense._id)}
                closeModal={() => setOpenModalId(null)}
              />
            ))
          ) : (
            <div className='mt-2 text-center'>
              <p className='text-black-persona mt-2'>Nenhum gasto encontrado...</p>
            </div>
          )}
          <div className='col-span-2'>
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
