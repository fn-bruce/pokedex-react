import { range } from "../utils/range";
import { useMemo } from "react";

export interface PaginationHookProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
}

export interface PaginationHookResult {
  paginationRange: number[];
}

export const DOTS = -1;

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: PaginationHookProps): PaginationHookResult => {
  const paginationRange = useMemo((): number[] => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [] as number[];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return { paginationRange };
};
