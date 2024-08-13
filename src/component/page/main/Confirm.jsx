import React, { useState } from 'react';
import axios from 'axios';
import ConfirmList from './ConfirmList';


function Confirm(props) {
  const{confirmId}= props;
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    id: {confirmId},
    text: '',
    image:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append('id', formData.id);
    formDataObject.append('text', formData.text);
    formDataObject.append('image', formData.image);
    
    try {
      const response = await axios.post('http://localhost:3000/item/confirm', formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

   const handleImageChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    const selectedImage = e.target.files[0];
    setImage(selectedImage);

   };

  return (
    <div>
    <form onSubmit={handleSubmit}>
       <h1>확인해주세요~!</h1>
      <div>
        <label>글:</label>
          <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          />
      </div>
      <div>
        <label>사진:</label>
          <input
          type="file"
          name="image"
          value={formData.image}
          onChange={handleImageChange}
          />
          {image && <img src={image} alt="Fetched Image" />}
        </div>
      <button type="submit">제출</button>
      <button type="submit">수정</button>
    </form>
    <ConfirmList condition={handleSubmit}/>
    </div>
  );
}

export default Confirm;