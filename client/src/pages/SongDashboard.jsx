import { Table, Modal, Button, Form, Input, message, Upload, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SongDashboard = () => {
  const [songs, setSongs] = useState([]); // List of songs
  const [artists, setArtists] = useState([]); // List of artists
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [file, setFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  // Fetch songs data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/songs');
        const data = await response.json();
        setSongs(data.data.response);
      } catch (err) {
        message.error('Failed to fetch songs data: ' + err.message);
      }
    };

    getData();
  }, []);

  // Fetch artist data
  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/artists');
        const data = await response.json();
        console.log(data.data)
        // Ensure the response contains artists data
        if (data && data.data && Array.isArray(data.data)) {
          setArtists(data.data); // Set the artists
      
        } else {
          message.error('No artists found.');
        }
      } catch (err) {
        message.error('Failed to fetch artists: ' + err.message);
      }
    };

    getArtists();
  }, []);

  const columns = [
    {
      key: '1',
      title: 'Image',
      dataIndex: 'img',
      render: (img) => <img src={img} alt="Song Cover" style={{ width: 100, height: 100 }} />,
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
      title: 'Artist',
      dataIndex: 'artist',
      render: (artist) => artist ? artist.name : 'N/A', // Assuming artist has a name field
    },
    {
      key: '5',
      title: 'Path',
      dataIndex: 'path',
      render: (path) => (
        <audio controls>
          <source src={path} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      ),
    },
    {
      key: '6',
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
    setFile(null);
    setAudioFile(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFile(null);
    setAudioFile(null);
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      const uploadedFile = info.file.originFileObj;
      setFile(uploadedFile);
      message.success('Image file selected successfully');
    }
  };

  const handleAudioFileChange = (info) => {
    const isMp3 = info.file.type === 'audio/mpeg';
    if (isMp3) {
      setAudioFile(info.file.originFileObj);
      message.success('Audio file selected successfully');
    } else {
      message.error('Please upload an mp3 file only');
    }
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('artist', values.artist); // Add the selected artist
      if (file) formData.append('file', file);
      if (audioFile) formData.append('path', audioFile);

      if (currentRecord) {
        const response = await axios.put(`http://localhost:8000/api/v1/songs/${currentRecord._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status === 200) {
          message.success('Song updated successfully');
          setSongs((prev) =>
            prev.map((item) => (item._id === currentRecord._id ? { ...item, ...response.data } : item))
          );
        } else {
          message.error('Failed to update song');
        }
      } else {
        const response = await axios.post('http://localhost:8000/api/v1/songs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status === 201) {
          message.success('Song added successfully');
          setSongs((prev) => [...prev, response.data]);
        } else {
          message.error('Failed to add song');
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
      setAudioFile(null);
    }
  };

  const onDeleteRecord = async (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this song?',
      okText: 'Yes',
      okType: 'danger',
      onOk: async () => {
        try {
          const response = await axios.delete(`http://localhost:8000/api/v1/songs/delete/${record._id}`);
          if (response.status === 200 || response.status === 204) {
            setSongs((prev) => prev.filter((item) => item._id !== record._id));
            message.success('Song deleted successfully');
          } else {
            message.error('Failed to delete song');
          }
        } catch (error) {
          console.error('Delete error:', error);
          message.error('Failed to delete song: ' + (error.response?.message || error.message));
        }
      },
    });
  };

  return (
    <div>
      <div className="border p-4">
        <div className="flex justify-between">
          <h1 className="text-center text-2xl font-bold">Songs</h1>
          <Button className="bg-orange-700 rounded-lg px-2" onClick={() => showModal()}>
            Add Song
          </Button>
          <Modal
            title={currentRecord ? 'Edit Song' : 'Add Song'}
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
                label="Artist"
                name="artist"
                rules={[{ required: true, message: 'Please select an artist!' }]}
              >
                <Select placeholder="Select an Artist">
                  {Array.isArray(artists) && artists.length > 0 ? (
                    artists.map((artist) => (
                      <Select.Option key={artist._id} value={artist._id}>
                        {artist.name}
                      </Select.Option>
                    ))
                  ) : (
                    <Select.Option disabled>No artists available</Select.Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                label="Audio File (mp3 only)"
                name="audio"
                rules={[{ required: true, message: 'Please upload an mp3 file!' }]}
              >
                <Upload
                  accept=".mp3"
                  beforeUpload={() => false}
                  onChange={handleAudioFileChange}
                  maxCount={1}
                >
                  <Button>Upload Audio</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Image File"
                name="cover"
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
        <Table columns={columns} dataSource={songs} rowKey="_id" />
      </div>
    </div>
  );
};

export default SongDashboard;
