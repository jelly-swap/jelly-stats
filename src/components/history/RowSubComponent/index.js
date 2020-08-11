import React from 'react';

import { EXPLORERS, STATUS } from '../../../config';
import { formatDate, cutTxHash } from '../../../utils';

import './style.scss';

export default ({ row }) => {
  const {
    transactionHash,
    network,
    outputNetwork,
    status,
    blockNumber,
    expiration,
    sender,
    outputAddress,
    completenessTransactionHash,
  } = row.original;

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
        <span>From Network: </span>
        <span>{network}</span>
      </div>
      <div>
        <span>To Network: </span>
        <span>{outputNetwork}</span>
      </div>
      <div>
        <span>Status: </span>
        <span>{STATUS[status]}</span>
      </div>
      <div>
        <span>Block: </span>
        <span>{blockNumber}</span>
      </div>
      <div>
        <span>Expiration: </span>
        <span>{formatDate(expiration)}</span>
      </div>
      <div>
        <span>From: </span>
        <span>{sender}</span>
      </div>
      <div>
        <span>To: </span>
        <span>{outputAddress}</span>
      </div>

      {completenessTransactionHash && (
        <div>
          <span>{STATUS[status]} Tx: </span>
          <span>
            <a href={EXPLORERS[outputNetwork] + completenessTransactionHash} target='_blank' rel='noopener noreferrer'>
              {cutTxHash(completenessTransactionHash)}
            </a>
          </span>
        </div>
      )}
    </>
  );
};
