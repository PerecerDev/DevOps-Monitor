import { MOCK_CREDENTIALS, mockUsers } from '@/shared/mocks/data';
import { simulateNetworkDelay } from '@/shared/lib/mockDelay';
import type { User } from '@/shared/types';

import type { LoginFormData } from '../schemas/loginSchema';

export const authService = {
  async login(credentials: LoginFormData): Promise<User> {
    await simulateNetworkDelay(null, 500);

    const isValid =
      credentials.email === MOCK_CREDENTIALS.email &&
      credentials.password === MOCK_CREDENTIALS.password;

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const user = mockUsers.find((u) => u.email === credentials.email);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },

  async getSession(): Promise<User | null> {
    return simulateNetworkDelay(null).then(() => null);
  },

  async logout(): Promise<void> {
    await simulateNetworkDelay(null, 200);
  },
};
