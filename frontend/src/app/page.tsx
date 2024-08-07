'use client';

import Footer from "./components/Footer";
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { fetchData } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonPersona from "./components/ButtonPersona";

export default function Home() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const data = await fetchData('user/login', undefined, 'POST', { username, password });
      localStorage.setItem('user_id', data._id);
      router.push('/dashboard');
    } catch (error) {
      toast.error('Username e/ou senha errados!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-mono text-deep-yellow-persona">
      <main className="flex-grow flex items-center justify-center p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
          <div className="flex flex-col items-center justify-center p-6">
            <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/72ab7e45-dbad-4185-8874-31ad720b8376/dbwhfim-7c79e8b7-ebc7-466e-ae48-ca992974f874.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcyYWI3ZTQ1LWRiYWQtNDE4NS04ODc0LTMxYWQ3MjBiODM3NlwvZGJ3aGZpbS03Yzc5ZThiNy1lYmM3LTQ2NmUtYWU0OC1jYTk5Mjk3NGY4NzQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4ljn4xtEVW43OKsxPyxVXU_gEPoVjXZjrYM6UQm7Scs' alt="Monopoly" className="w-full max-w-md" />
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-cadet-gray rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold  mb-4">Login</h2>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <label className="block mb-2  font-medium" htmlFor="username">Nome de usuário:</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Nome de usuário"
                className="block w-full mb-4 p-2 border rounded-md"
                required
              />
              <label className="block mb-2  font-medium" htmlFor="password">Senha:</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Senha"
                className="block w-full mb-4 p-2 border rounded-md"
                required
              />

              <div className="text-center">
                <ButtonPersona img1="./fonts/login.png" img2="./fonts/login2.png" />
              </div>
            </form>
            <p className="mt-4 ">
              <a href="/signup" className=" hover:underline"><i className="fa-solid fa-user-plus" /> Faça seu cadastro </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
