import React from 'react';
import { arrayOf, object } from 'prop-types';

import { Table, Th, Td } from '../Table';

const EmployeesOrders = ({ orders }) => (
  <Table>
    <thead>
      <tr>
        <Th>Nome</Th>
        <Th>Material</Th>
        <Th>Quantidade</Th>
        <Th>Data</Th>
      </tr>
    </thead>

    <tbody>
      { orders.map((order) => (
        <tr>
          <Td>{order.user}</Td>
          <Td>{order.name}</Td>
          <Td>{order.quantity}</Td>
          <Td>{order.createdDate}</Td>
        </tr>
      ))}
    </tbody>
  </Table>
);

EmployeesOrders.propTypes = {
  orders: arrayOf(object),
}.isRequired;

export default EmployeesOrders;
