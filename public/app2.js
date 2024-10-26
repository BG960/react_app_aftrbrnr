import React from 'react';
import { Table } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

const Fighters = [
  {
    key: '1',
    name: "Macdonnel-Douglas F4 Phantom II",
    introduction_year: 1960,
    country: "USA",
    price: 2.4,
  },
  {
    key: '2',
    name: "Mikoyan-Gurevich Mig 21",
    introduction_year: 1959,
    country: "USSR",
    price: 2.4,
  },
  {
    key: '3',
    name: "Sukhoi Su-9",
    introduction_year: 1959,
    country: "USSR",
    price: 1,
  },
  {
    key: '4',
    name: "Mcdonnel Douglas F-101 Voodoo",
    introduction_year: 1953,
    country: "USA",
    price: 1.6,
  },
  {
    key: '5',
    name: "English Electric Lightning",
    introduction_year: 1959,
    country: "UK",
    price: 2,
  },
  {
    key: '6',
    name: "Hawker Hunter",
    introduction_year: 1956,
    country: "UK",
    price: 1.2,
  },
  {
    key: '7',
    name: "Dassault Etendard IV",
    introduction_year: 1962,
    country: "France",
    price: 1.5,
  },
  {
    key: '8',
    name: "Saab 35 Draken",
    introduction_year: 1960,
    country: "Sweden",
    price: 2,
  },
  {
    key: '9',
    name: "Fiat G.91",
    introduction_year: 1958,
    country: "Italy",
    price: 2.4,
  },
];

const App = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name', // Добавлен dataIndex
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Introduction Year', // Исправлено название для читаемости
      dataIndex: 'introduction_year', // Добавлен dataIndex
      key: 'introduction_year',
      sorter: (a, b) => a.introduction_year - b.introduction_year,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Country', // Исправлено название
      dataIndex: 'country', // Добавлен dataIndex
      key: 'country',
      sorter: (a, b) => a.country.localeCompare(b.country),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Price',
      dataIndex: 'price', // Здесь dataIndex уже был
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Fighters</h1>
      <Table
        columns={columns}
        dataSource={Fighters}
        rowKey="key"
      />
    </div>
  );
};

export default App;
