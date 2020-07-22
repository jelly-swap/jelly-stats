import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import Select from 'react-select';

import { useLp } from '../../context/rewards';

import { selectorStyles } from '../../utils';

import './style.scss';

const selecctorOptions = [{ label: 10 }, { label: 20 }, { label: 30 }, { label: 40 }, { label: 50 }];

export default () => {
  const lpData = useLp() || [];

  const data = useMemo(() => lpData, [lpData]);

  const columns = useMemo(
    () => [
      {
        accessor: 'date',
      },
      {
        accessor: 'name',
      },
      {
        accessor: 'usd',
      },
      {
        accessor: 'reward',
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
    <div className='reward-wrapper slide-in-bottom'>
      {' '}
      <table>
        <thead>
          <tr>
            <>
              <th>Date</th>
              <th>Node</th>
              <th>Liquidity</th>
              <th>Reward</th>
            </>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            console.log(row);
            const date = row.values.date;
            const name = row.values.name;
            const liquidity = row.values.usd.toFixed(2);
            const reward = row.values.reward?.toFixed(2);

            return (
              <tr key={i}>
                <td>{date}</td>
                <td>{name}</td>
                <td>${liquidity}</td>
                <td>${reward}</td>
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
            options={selecctorOptions}
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
