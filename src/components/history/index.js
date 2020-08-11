import React, { useMemo } from 'react';
import { useTable, usePagination, useExpanded } from 'react-table';
import Select from 'react-select';

import RowSubComponent from './RowSubComponent';

import { PARSE_AMOUNT, EXPLORERS } from '../../config';
import { useSwaps } from '../../context/history/';

import { selectorStyles, truncateAddress, formatDate, cutTxHash } from '../../utils';

import './style.scss';

const selecctorOptions = [{ label: 10 }, { label: 20 }, { label: 30 }, { label: 40 }, { label: 50 }];

export default () => {
  const swaps = useSwaps() || [];

  const data = useMemo(() => swaps, [swaps]);

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>,
      },
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
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded,
    usePagination
  );

  return (
    <div className='history-wrapper slide-in-bottom'>
      {' '}
      <table>
        <thead>
          <tr>
            <>
              <th></th>
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
            const expandedComponent = row.cells[0].render('Cell');
            const network = row.cells[1].value;
            const pair = `${row.cells[1].value} - ${row.cells[2].value}`;
            const sender = row.cells[3].value;
            const receiver = row.cells[4].value;
            const date = formatDate(row.cells[5].value);
            const txHash = row.cells[6].value;
            const inputAmount = PARSE_AMOUNT[network](row.cells[7].value);

            return (
              <React.Fragment key={i}>
                <tr>
                  <td>{expandedComponent}</td>
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
                {row.isExpanded && (
                  <tr>
                    <td className='more-info' colSpan={visibleColumns.length}>
                      <RowSubComponent row={row} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
