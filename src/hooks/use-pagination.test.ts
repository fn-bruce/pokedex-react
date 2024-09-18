import {
  PaginationHookProps,
  PaginationHookResult,
  usePagination,
} from "./use-pagination";
import { renderHook } from "@testing-library/react";

describe("usePagination", () => {
  it("test", () => {
    // arrange
    const input: PaginationHookProps = {
      totalCount: 0,
      pageSize: 0,
      siblingCount: 0,
      currentPage: 0,
    };

    // act
    const { result } = renderHook(
      (): PaginationHookResult => usePagination(input),
    );

    // assert
    console.log(result.current);
  });
});
