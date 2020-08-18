import React, { useMemo } from 'react';
import { useTable, usePagination, useExpanded } from 'react-table';
import Select from 'react-select';

import RowSubComponent from './RowSubComponent';

import { PARSE_AMOUNT, EXPLORERS } from '../../config';
import { useSwaps } from '../../context/history/';

import { useWindowSize } from '../../hooks/useWindowSize';

import { selectorStyles, truncateAddress, formatDate, cutTxHash } from '../../utils';

import Arrow from '../../css/images/arrow.svg';

import './style.scss';
import { DEVICE_TYPES } from '../../constants';

const selectorOptions = [{ label: 10 }, { label: 20 }, { label: 30 }, { label: 40 }, { label: 50 }];

export default () => {
  const swaps = useSwaps();
  const { deviceType } = useWindowSize();

  const data = useMemo(() => swaps, [swaps]);

  const isDesktop = useMemo(() => {
    return deviceType === DEVICE_TYPES.DESKTOP;
  }, [deviceType]);

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
          <span className={row.isExpanded ? 'arrow expanded' : 'arrow'}>
            <img src={Arrow} alt='arrow' />
          </span>
        ),
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
              {isDesktop ? <th>From</th> : null}
              {isDesktop ? <th>To</th> : null}
              <th>Value</th>
              <th>Expiration</th>
              {isDesktop ? <th>TxHash</th> : null}
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
                <tr {...row.getToggleRowExpandedProps()}>
                  <td>{expandedComponent}</td>
                  <td>{pair}</td>
                  {isDesktop ? <td title={sender}>{truncateAddress(sender)}</td> : null}
                  {isDesktop ? <td title={sender}>{truncateAddress(receiver)}</td> : null}
                  <td>{`${inputAmount} ${network}`}</td>
                  <td>{date}</td>
                  {isDesktop ? (
                    <td>
                      <a href={EXPLORERS[network] + txHash} target='_blank' rel='noopener noreferrer'>
                        {cutTxHash(txHash)}
                      </a>
                    </td>
                  ) : null}
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
