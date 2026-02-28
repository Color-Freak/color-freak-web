'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Busca o usuário no banco
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  // 2. Compara a senha digitada com a senha criptografada do banco
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error('Senha incorreta');
  }

  // 3. Cria o Token JWT com o ID real do usuário
  const token = await createToken(user.id);

  // 4. Salva o Token em um Cookie HTTP-Only (Segurança máxima: hackers não conseguem ler via JavaScript)
  const cookieStore = await cookies();
  cookieStore.set('color-freak-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 dias
  });

  // 5. Deu tudo certo, manda para o painel!
  redirect('/admin/posts/new');
}