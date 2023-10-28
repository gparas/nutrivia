import { useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const useSearchQueryParams = (param: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get(param);

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(param, value);

      return params.toString();
    },
    [searchParams],
  );

  const updateSearchParams = (value: string) => {
    router.push(pathname + '?' + createQueryString(value));
  };

  return {
    query,
    updateSearchParams,
  };
};

export default useSearchQueryParams;
