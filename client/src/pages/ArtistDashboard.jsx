import { Table, Modal, Button, Form, Input, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtistDashboard = () => {
  const [value, setValue] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/artists');
        const data = await response.json();
        console.log('Fetched data:', data.data);
        setValue(data.data);
      } catch (err) {
        message.error('Failed to fetch data: ' + err.message);
      }
    };

    getData();
  }, []);

  const columns = [
    {
      key: '1',
      title: 'Image',
      dataIndex: 'imgUrl',
      render: (imgUrl) => <img src={imgUrl} alt="Artist" style={{ width: 100, height: 100 }} />,
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: '3',
      title: 'Description',
      dataIndex: 'description',
    },
    {
      key: '4',
      title: 'Actions',
      render: (record) => (
        <>
          <button className="text-blue-500" onClick={() => showModal(record)}>Edit</button>
          <button className="text-red-600 ml-12" onClick={() => onDeleteRecord(record)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  const showModal = (record = null) => {
    setIsModalVisible(true);
    form.resetFields();
    setCurrentRecord(record);
    setImageUrl(record?.imgUrl || '');
    setFile(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFile(null);
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      const uploadedFile = info.file.originFileObj;
      setFile(uploadedFile);
      message.success('File selected successfully');
    }
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      if (file) formData.append('file', file);

      if (currentRecord) {
        // Edit request (PUT)
        const response = await axios.put(`http://localhost:8000/api/v1/artists/edit/${currentRecord._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status === 200) {
          message.success('Project updated successfully');
          setValue((prev) =>
            prev.map((item) => (item._id === currentRecord._id ? { ...item, ...response.data } : item))
          );
        } else {
          message.error('Failed to update project');
        }
      } else {
        // Add request (POST)
        const response = await axios.post('http://localhost:8000/api/v1/artists', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status === 201) {
          message.success('Project added successfully');
          setValue((prev) => [...prev, response.data]);
        } else {
          message.error('Failed to add project');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      message.error('Failed to submit: ' + (error.response?.message || error.message));
    } finally {
      setIsSubmitting(false);
      setIsModalVisible(false);
      form.resetFields();
      setFile(null);
    }
  };

  const onDeleteRecord = async (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this project?',
      okText: 'Yes',
      okType: 'danger',
      onOk: async () => {
        try {
          const response = await axios.delete(`http://localhost:8000/api/v1/artists/delete/${record._id}`);
          if (response.status === 200 || response.status === 204) {
            setValue((prev) => prev.filter((item) => item._id !== record._id));
            message.success('Project deleted successfully');
          } else {
            message.error('Failed to delete project: Unexpected response status');
          }
        } catch (error) {
          console.error('Delete error:', error);
          message.error('Failed to delete project: ' + (error.response?.message || error.message));
        }
      },
    });
  };

  return (
    <div>
      <div className="border p-4">
        <div className="flex justify-between">
          <h1 className="text-center text-2xl font-bold">Artists</h1>
          <Button className="bg-orange-700 rounded-lg px-2" onClick={() => showModal()}>
            Add Project
          </Button>
          <Modal
            title={currentRecord ? "Edit Project" : "Add Project"}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the description!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                label="Image File"
                name="file"
              >
                <Upload
                  listType="picture"
                  beforeUpload={() => false}
                  onChange={handleFileChange}
                  maxCount={1}
                >
                  <Button>Upload Image</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={value} rowKey="_id" />
      </div>
    </div>
  );
};

export default ArtistDashboard;
