import React from 'react';

import { PARSE_AMOUNT, EXPLORERS, STATUS } from '../../../config';
import { formatDate, cutTxHash } from '../../../utils';

import './style.scss';

export default ({ row }) => {
  let {
    transactionHash,
    network,
    outputNetwork,
    status,
    blockNumber,
    expiration,
    sender,
    outputAddress,
    completenessTransactionHash,
    inputAmount,
    outputAmount,
  } = row.original;

  inputAmount = PARSE_AMOUNT[network](inputAmount);
  outputAmount = PARSE_AMOUNT[outputNetwork](outputAmount);

  return (
    <>
      <div>
        <span>Transaction Hash: </span>
        <span>
          <a href={EXPLORERS[network] + transactionHash} target='_blank' rel='noopener noreferrer'>
            {cutTxHash(transactionHash)}
          </a>
        </span>
      </div>
      <div>
        <span>Status: </span>
        <span>{STATUS[status]}</span>
      </div>
      <div>
        <span>From Network: </span>
        <span>
          {network} ({inputAmount})
        </span>
      </div>
      <div>
        <span>To Network: </span>
        <span>
          {outputNetwork} ({outputAmount})
        </span>
      </div>
      <div>
        <span>From: </span>
        <span>{sender}</span>
      </div>
      <div>
        <span>To: </span>
        <span>{outputAddress}</span>
      </div>

      <div>
        <span>Block: </span>
        <span>{blockNumber}</span>
      </div>
      <div>
        <span>Expiration: </span>
        <span>{formatDate(expiration)}</span>
      </div>

      {completenessTransactionHash && (
        <div>
          <span>{STATUS[status]} Tx: </span>
          <span>
            <a
              href={
                STATUS[status] === 'REFUNDED'
                  ? EXPLORERS[network] + completenessTransactionHash
                  : EXPLORERS[outputNetwork] + completenessTransactionHash
              }
              target='_blank'
              rel='noopener noreferrer'
            >
              {cutTxHash(completenessTransactionHash)}
            </a>
          </span>
        </div>
      )}
    </>
  );
};
