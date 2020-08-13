import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import Select from 'react-select';

import { useSwaps } from '../../context/history';
import { useAllPrices } from '../../context/price';

import { selectorOptions } from '../../config';
import { calCompetitionResults } from './utils';
import { selectorStyles } from '../../utils';

export default () => {
  const allSwaps = useSwaps() || [];
  const prices = useAllPrices();

  const [competitionResult, setCompetitionResult] = useState([]);

  useEffect(() => {
    if (!allSwaps.length || !prices) return;

    setCompetitionResult(() => calCompetitionResults(allSwaps, prices));
  }, [allSwaps, prices]);

  const data = useMemo(() => competitionResult, [competitionResult]);

  const columns = useMemo(
    () => [
      {
        accessor: 'address',
      },
      {
        accessor: 'addressVolume',
      },
    ],
    []
  );

  const {
    getTableBodyProps,
    prepareRow,

    // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    page,

    // pagination props
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  return (
    <div className='history-wrapper slide-in-bottom'>
      {' '}
      <table>
        <thead>
          <tr>
            <>
              <th>Address</th>
              <th>Address Volume</th>
            </>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);

            const address = row.original.address;
            const addressVolume = row.original.addressVolume;

            return (
              <tr key={i}>
                <td>{address}</td>
                <td>${addressVolume} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <div className='selector-container'>
          <Select
            options={selectorOptions}
            styles={selectorStyles()}
            onChange={(e) => setPageSize(e.label)}
            placeholder={`Show ${pageSize}`}
            value={pageSize}
          />
        </div>
      </div>
    </div>
  );
};
