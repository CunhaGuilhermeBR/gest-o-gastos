import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {

  const handleClick = () => {
    localStorage.removeItem('actualExpense');
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
  };

  return (
    <div className="font-mono font-bold grid w-full grid-cols-5 gap-4 bg-black-persona p-4 text-deep-yellow-persona shadow-lg">
      <div className="flex items-center justify-center">
        <a className='cursor-pointer' href='/dashboard'>
          <img
            //src="https://a-static.mlcdn.com.br/470x352/adesivo-tio-patinhas-3d-alta-resistencia-multi-adesivos/olistsp/ospuq7lsvxqq3ahr/917eb69ede3b5146496648d7ad51903e.jpeg"
            src="https://pm1.aminoapps.com/7036/66f183daeb4c852214341017d8f4d2d660070b52r1-577-512v2_00.jpg"
            alt="Icon"
            className="h-20 w-20 rounded-full"
          />
        </a>
      </div>
      <div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
        <a href='/profile'>Meu perfil</a>
      </div>
      <div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
        <Link
          href='/expense'
          className='cursor-pointer'
          onClick={handleClick}
        >
          Criar novo gasto/rendimento
        </Link>
      </div>
      <div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
        <a href='/dashboard'>Meus gastos/rendimentos</a>
      </div>

      <div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
        <Link
          href='/'
          className='cursor-pointer'
          onClick={handleLogout}
        >
          Sair
        </Link>
      </div>
    </div>
  );
};

export default Header;
