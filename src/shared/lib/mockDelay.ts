const MOCK_DELAY_MS = 300;

export function simulateNetworkDelay<T>(data: T, delayMs = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(structuredClone(data));
    }, delayMs);
  });
}

export function simulateNetworkError(message = 'Network request failed'): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(message));
    }, MOCK_DELAY_MS);
  });
}
