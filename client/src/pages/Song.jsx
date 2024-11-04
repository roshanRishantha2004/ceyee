import { Table, Modal, Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const Song = () => {
  const [value, setValue] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/api/v1/songs/get');
  //       const data = await response.json();
  //       // Use imported function
  //       console.log(data);
  //       setValue(data);
  //     } catch (err) {
  //       message.error('Failed to fetch data: ' + err.message);
  //     }
  //   };

  //   getData();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/songs/get');
        const data = await response.json();
        console.log('Fetched data:', data.data.response);
        setValue(data.data.response);
        // // Check if data is an array
        // if (Array.isArray(data)) {
        //   setValue(data);
        // } else {
        //   console.error('Data is not an array:', data);
        //   message.error('Unexpected data format received from the server.');
        // }
      } catch (err) {
        message.error('Failed to fetch data: ' + err.message);
      }
    };
  
    getData();
  }, []);
  

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: '_id',
    },
    {
      key: '2',
      title: 'Artist',
      dataIndex: 'artist',
    },
    {
      key: '3',
      title: 'Project Song',
      dataIndex: 'song',
    },
    {
      key: '4',
      title: 'Song Path',
      dataIndex: 'songPath',
    },
    {
      key: '6',
      title: 'Actions',
      render: (record) => (
        <>
          <button className='text-blue-500'>Edit</button>
          <button
            className='text-red-600 ml-12'
            onClick={() => onDeleteStudent(record)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setIsSubmitting(true);
    // Add form submission logic here
  };

  const onDeleteStudent = async (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this Project?',
      okText: 'Yes',
      okType: 'danger',
      onOk: async () => {
        try {
          // Replace `YOUR_API_ENDPOINT` with your actual API endpoint
          console.log(record._id)
          const response = await axios.delete(`http://localhost:8000/api/v1/songs/delete/${record._id}`);
          
          if (response.status === 200 || response.status === 204) {
            setValue((prev) => prev.filter((item) => item._id !== record._id));
            message.success('Song deleted successfully');
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
          <h1 className="text-center text-2xl font-bold">Past Projects</h1>
          <Button className="bg-orange-700 rounded-lg px-2" onClick={showModal}>
            Add Course
          </Button>
          <Modal
            title="Project Form"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[{ required: true, message: 'Please input the project name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Project Slug"
                name="projectSlug"
                rules={[{ required: true, message: 'Please input the project slug!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Project Description"
                name="projectDescription"
                rules={[{ required: true, message: 'Please input the project description!' }]}
              >
                <Input.TextArea rows={4} />
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
        <Table columns={columns} dataSource={value}/>
      </div>
    </div>
  );
};

export default Song;
