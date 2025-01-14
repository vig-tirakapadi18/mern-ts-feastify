import React, { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface IPaginationProps {
  pages: number;
  page: number;
  onPageChange: (page: number) => void;
}

const PaginationSelector: FC<IPaginationProps> = ({
  pages,
  onPageChange,
  page,
}): React.JSX.Element => {
  const pageNumbers = [];
  for (let i = 1; i < pages; i++) pageNumbers.push(i);

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)}
              size="default"
            />
          </PaginationItem>
        )}

        {pageNumbers.map((number) => (
          <PaginationItem key={crypto.randomUUID()}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(number)}
              isActive={page === number}
              size="default"
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(page + 1)}
              size="default"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
