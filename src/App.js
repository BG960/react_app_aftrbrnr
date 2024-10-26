import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Modal } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './app.css'; 

const App = () => {
  const { control, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editStateKey, setEditStateKey] = useState(null);
  const { t, i18n } = useTranslation();

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const products = await response.json();
      const formattedProducts = products.map(product => ({
        key: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.images && product.images[0] ? product.images[0] : '', 
      }));
      setData(formattedProducts);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const onSubmit = (formData) => {
    if (editStateKey) {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editStateKey ? { ...item, ...formData } : item
        )
      );
      setEditStateKey(null);
    } else {
      setData((prevData) => [
        ...prevData,
        { key: Date.now(), ...formData },
      ]);
    }
    reset();
    setIsModalVisible(false); 
  };

  const editFunc = (rec) => {
    reset({
      title: rec.title,
      price: rec.price,
      description: rec.description,
      image: rec.image || '', 
    });
    setEditStateKey(rec.key);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter(item => item.key !== key));
  };

  const columns = [
    { title: 'ID', dataIndex: 'key', key: 'key' },
    { title: 'Название', dataIndex: 'title', key: 'title' },
    { title: 'Цена', dataIndex: 'price', key: 'price' },
    { title: 'Описание', dataIndex: 'description', key: 'description' },
    {
      title: 'Изображение',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        image ? <img src={image} alt="product" style={{ width: '50px', height: '50px' }} /> : 'Нет изображения'
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (rec) => (
        <div className="table-actions">
          <Button onClick={() => editFunc(rec)}>Изменить</Button>
          <Button onClick={() => handleDelete(rec.key)} style={{ marginLeft: '10px' }} type="danger">
            Удалить
          </Button>
        </div>
      ),
    },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => changeLanguage('en')}>English</Button>
        <Button onClick={() => changeLanguage('ru')}>Русский</Button>
      </div>

      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Добавить товар
      </Button>

      <Table dataSource={data} columns={columns} rowKey="key" style={{ marginTop: '20px' }} />

      <Modal
        title={editStateKey ? 'Изменить товар' : 'Добавить товар'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditStateKey(null);
        }}
        footer={null}
      >
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item label="Название" required>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} placeholder="Введите название товара" />}
            />
          </Form.Item>

          <Form.Item label="Цена" required>
            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input type="number" {...field} placeholder="Введите цену товара" />}
            />
          </Form.Item>

          <Form.Item label="Описание" required>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input.TextArea {...field} placeholder="Введите описание товара" />}
            />
          </Form.Item>

          <Form.Item label="Изображение (URL)">
            <Controller
              name="image"
              control={control}
              render={({ field }) => <Input {...field} placeholder="URL изображения" />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {editStateKey ? 'Обновить товар' : 'Добавить товар'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
