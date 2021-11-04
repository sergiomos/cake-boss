import React from 'react';
import { arrayOf, func, object } from 'prop-types';

import { Table, Th, Td } from '../Table';

import { RequestButton, RequestTextInput } from './style';

const ListRawMaterials = ({ rawMaterials, handleOrderRequest }) => (
  <Table>
    <thead>
      <tr>
        <Th>Nome</Th>
        <Th>Em estoque</Th>
        <Th>Fazer pedido</Th>
      </tr>
    </thead>

    <tbody>
      { rawMaterials.map((rawMaterial) => (
        <tr>
          <Td>{rawMaterial.name}</Td>
          <Td>{rawMaterial.quantity}</Td>
          <Td>
            <form onSubmit={(e) => handleOrderRequest(e, rawMaterial._id)}>
              <RequestTextInput
                type="number"
                placeholder="Qt."
                required
              />
              <RequestButton
                type="submit"
              >
                Retirar
              </RequestButton>
            </form>
          </Td>
        </tr>
      ))}
    </tbody>
  </Table>
);

ListRawMaterials.propTypes = {
  rawMaterials: arrayOf(object),
  handleOrderRequest: func,
}.isRequired;

export default ListRawMaterials;
