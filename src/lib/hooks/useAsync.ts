import { useCallback, useMemo, useState } from "react";

export const useAsync = <F extends (...args: any[]) => Promise<any>>(fn: F) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [value, setValue] = useState<Awaited<ReturnType<F>> | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setValue(null);
  }, []);

  const dispatch = useCallback(
    async (...args: Parameters<F>): Promise<void> => {
      try {
        setIsLoading(true);
        const result = await fn(...args);
        setValue(result);
        setError(null);
      } catch (error) {
        setValue(null);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [fn]
  );

  return useMemo(
    () => ({ isLoading, error, value, reset, dispatch }),
    [isLoading, error, value, reset, dispatch]
  );
};
