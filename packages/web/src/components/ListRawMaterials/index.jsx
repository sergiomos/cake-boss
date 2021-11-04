import React from 'react';
import { arrayOf, object } from 'prop-types';

import { Table, Th, Td } from '../Table';

const ListRawMaterials = ({ rawMaterials }) => (
  <Table>
    <thead>
      <tr>
        <Th>Nome</Th>
        <Th>Em estoque</Th>
      </tr>
    </thead>

    <tbody>
      { rawMaterials.map((rawMaterial) => (
        <tr>
          <Td>{rawMaterial.name}</Td>
          <Td>{rawMaterial.quantity}</Td>
        </tr>
      ))}
    </tbody>
  </Table>
);

ListRawMaterials.propTypes = {
  orders: arrayOf(object),
}.isRequired;

export default ListRawMaterials;
