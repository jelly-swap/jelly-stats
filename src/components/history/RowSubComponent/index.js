import React from 'react';

import { PARSE_AMOUNT, EXPLORERS, STATUS, STATUS_TO_NAME } from '../../../config';
import { formatDate, cutTxHash, truncateAddress } from '../../../utils';

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
        <span>Sent: </span>
        <span>
          {inputAmount} {network}
        </span>
      </div>
      <div>
        <span>Received: </span>
        <span>
          {outputAmount} {outputNetwork}
        </span>
      </div>
      <div>
        <span>From: </span>
        <span>{truncateAddress(sender)}</span>
      </div>
      <div>
        <span>To: </span>
        <span>{truncateAddress(outputAddress)}</span>
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
          <span>{STATUS_TO_NAME[status]}: </span>
          <span>
            <a href={EXPLORERS[network] + completenessTransactionHash} target='_blank' rel='noopener noreferrer'>
              {cutTxHash(completenessTransactionHash)}
            </a>
          </span>
        </div>
      )}
    </>
  );
};
