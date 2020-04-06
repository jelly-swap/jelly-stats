import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import Select from 'react-select';

import { PARSE_AMOUNT, EXPLORERS } from '../../config';
import { useSwaps } from '../../context/history/';

import { selectorStyles, truncateAddress, formatDate } from '../../utils';

import './style.scss';

const selecctorOptions = [{ label: 10 }, { label: 20 }, { label: 30 }, { label: 40 }, { label: 50 }];

export default () => {
  const swaps = useSwaps() || [];

  const data = useMemo(() => swaps, [swaps]);

  const columns = useMemo(
    () => [
      {
        accessor: 'network',
      },
      {
        accessor: 'outputNetwork',
      },
      {
        accessor: 'sender',
      },
      {
        accessor: 'receiver',
      },
      {
        accessor: 'expiration',
      },
      {
        accessor: 'transactionHash',
      },
      {
        accessor: 'inputAmount',
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

  const cutTxHash = (txHash) => {
    return txHash.substr(0, 12) + '...';
  };

  return (
    <div className='history-wrapper slide-in-bottom'>
      {' '}
      <table>
        <thead>
          <tr>
            <>
              <th>Pair</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Expiration</th>
              <th>TxHash</th>
            </>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            const network = row.cells[0].value;
            const pair = `${row.cells[0].value} - ${row.cells[1].value}`;
            const sender = row.cells[2].value;
            const receiver = row.cells[3].value;
            const date = formatDate(row.cells[4].value);
            const txHash = row.cells[5].value;
            const inputAmount = PARSE_AMOUNT[network](row.cells[6].value);

            return (
              <tr key={i}>
                <td>{pair}</td>
                <td title={sender}>{truncateAddress(sender)}</td>
                <td title={sender}>{truncateAddress(receiver)}</td>
                <td>{`${inputAmount} ${network}`}</td>
                <td>{date}</td>
                <td>
                  <a href={EXPLORERS[network] + txHash} target='_blank' rel='noopener noreferrer'>
                    {cutTxHash(txHash)}
                  </a>
                </td>
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
