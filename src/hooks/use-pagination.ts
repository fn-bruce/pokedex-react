import { useMemo } from "react";

export interface PaginationHookProps {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

export interface PaginationHookResult {
  paginationRange: number[];
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: PaginationHookProps): PaginationHookResult => {
  const paginationRange = useMemo((): number[] => {
    return [] as number[];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return { paginationRange };
};
