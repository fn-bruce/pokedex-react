import {
  DOTS,
  PaginationHookProps,
  PaginationHookResult,
  usePagination,
} from "./use-pagination";
import { renderHook } from "@testing-library/react";

describe("usePagination", () => {
  it("returns correct pagination range when current page is in the middle", () => {
    const input: PaginationHookProps = {
      totalCount: 100,
      pageSize: 6,
      siblingCount: 1,
      currentPage: 8,
    };
    const expected = [1, DOTS, 7, 8, 9, DOTS, 17];

    const { result } = renderHook(
      (): PaginationHookResult => usePagination(input),
    );

    expect(result.current.paginationRange).toStrictEqual(expected);
  });

  it("returns correct pagination range when current page is the last page", () => {
    const input: PaginationHookProps = {
      totalCount: 100,
      pageSize: 6,
      siblingCount: 1,
      currentPage: 17,
    };
    const expected = [1, DOTS, 13, 14, 15, 16, 17];

    const { result } = renderHook(
      (): PaginationHookResult => usePagination(input),
    );

    expect(result.current.paginationRange).toStrictEqual(expected);
  });

  it("returns the entire range without dots when total count is small", () => {
    const input: PaginationHookProps = {
      totalCount: 30,
      pageSize: 6,
      siblingCount: 1,
      currentPage: 3,
    };
    const expected = [1, 2, 3, 4, 5];

    const { result } = renderHook(
      (): PaginationHookResult => usePagination(input),
    );

    expect(result.current.paginationRange).toStrictEqual(expected);
  });

  it("returns pagination range with no siblings when sibling count is zero", () => {
    const input: PaginationHookProps = {
      totalCount: 100,
      pageSize: 6,
      siblingCount: 0,
      currentPage: 8,
    };
    const expected = [1, DOTS, 8, DOTS, 17];

    const { result } = renderHook(
      (): PaginationHookResult => usePagination(input),
    );

    expect(result.current.paginationRange).toStrictEqual(expected);
  });

  it("returns single page when total count fits within one page", () => {
    const input: PaginationHookProps = {
      totalCount: 5,
      pageSize: 6,
      siblingCount: 1,
      currentPage: 1,
    };
    const expected = [1];

    const { result } = renderHook(
      (): PaginationHookResult => usePagination(input),
    );

    expect(result.current.paginationRange).toStrictEqual(expected);
  });
});
