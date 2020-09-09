import React from 'react';
import { useListContext } from 'react-admin';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { Button, Toolbar } from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';

const CustomPagination = () => {
  const { page, perPage, total, setPage } = useListContext();
  const nbPages = Math.ceil(total / perPage) || 1;
  return (
    nbPages > 1 &&
    <Toolbar>
      {page > 1 &&
      <Button color="primary" key="prev" onClick={() => setPage(page - 1)}>
        <ChevronLeft />
        Prev
      </Button>
      }
      {page !== nbPages &&
      <Button color="primary" key="next" onClick={() => setPage(page + 1)}>
        Next
        <ChevronRight />
      </Button>
      }
    </Toolbar>
  );
}

export default CustomPagination;
