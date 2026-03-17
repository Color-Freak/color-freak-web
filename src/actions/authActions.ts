// authAction.ts
'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';

type LoginState = {
  error: string;
} | null;

// 1. Adicionamos o 'prevState: any' como primeiro parâmetro obrigatório do hook
export async function handleLogin(prevState: LoginState, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  // 2. Trocamos o 'throw new Error' por um 'return' suave
  if (!user) {
    return { error: 'Usuário não encontrado' };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  // 3. Trocamos o 'throw new Error' aqui também
  if (!isValidPassword) {
    return { error: 'E-mail ou senha incorretos' }; // Dica de segurança: mensagens genéricas dificultam a vida de hackers
  }

  const token = await createToken(user.id);

  const cookieStore = await cookies();
  cookieStore.set('color-freak-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 1 // 1 horas
  });

  redirect('/admin/posts');
}

export async function handleLogout() {
  const cookieStore = await cookies();

  // Destrói o token apagando o cookie
  cookieStore.delete('color-freak-token');

  // Redireciona de volta para a tela inicial ou de login
  redirect('/');
}