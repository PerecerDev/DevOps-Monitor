import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { authService } from '../services/authService';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import { useAuthStore } from '../stores/authStore';

export function useLoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (user) => {
      login(user);
      void navigate('/dashboard', { replace: true });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return { form, onSubmit, mutation };
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      logout();
      void navigate('/login', { replace: true });
    },
  });
}
