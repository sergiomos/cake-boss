import React from 'react';
import { arrayOf, object } from 'prop-types';

import { Table, Th, Td } from '../Table';

import { RequestButton, RequestTextInput } from './style';

const ListRawMaterials = ({ rawMaterials }) => {
  const handleOrderRequest = (e, rawMaterialId) => {
    const { value: quantity } = e.target.previousSibling;
    console.log(rawMaterialId);
    console.log(quantity);
  };

  return (
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
              <RequestTextInput
                type="number"
                placeholder="Qt."
              />
              <RequestButton
                type="Button"
                onClick={(e) => handleOrderRequest(e, rawMaterial._id)}
              >
                Retirar

              </RequestButton>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

ListRawMaterials.propTypes = {
  rawMaterials: arrayOf(object),
}.isRequired;

export default ListRawMaterials;
