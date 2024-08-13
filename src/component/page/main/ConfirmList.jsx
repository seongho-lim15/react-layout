//get blob main으로 돌아가기버튼
import React, { useState, useEffect  } from 'react';
import axios from 'axios';

function ConfirmList ({condition , confirmId}){
  // const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/item/confirmlist/${confirmId}`);
        setImageInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image info:', error);
      }
    };

    fetchImageInfo();
  }, [condition]);

  if (loading) return <div>Loading...</div>;
  if (!imageInfo) return <div>No data found</div>;

  // const handleImageFetch = () => {
  //   axios.get(`http://localhost:3000/item/comfirmlist/${id}`, { responseType: 'blob' })
  //     .then(response => {
  //       // 이미지 데이터를 Blob 형태로 받아옴
  //       const blob = new Blob([response.data]);
  //       // Blob을 이미지로 표시하기 위해 URL.createObjectURL 사용
  //       const imageUrl = URL.createObjectURL(blob);
  //       setImage(imageUrl);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching image:', error);
  //     });
  // };



  ///// const handleImageChange = (event) => {
  /////   const selectedImage = event.target.files[0];
  /////   setImage(selectedImage);
  ///// };

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   formData.append('image', image);

  //   axios.post('http://localhost:3000/item/comfirmlist', formData)
  //     .then(response => {
  //       console.log('Image uploaded successfully:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error uploading image:', error);
  //     });
  // };

    return (
  
      <div>
      <h1>ConfirmList</h1>  

      <div>
      <img src={`data:image/jpeg;base64,${imageInfo.imageData}`} alt="Image" />
      <p>{imageInfo.description}</p>
      </div>

      {/* <div>
      <button onClick={handleImageFetch}>Fetch Image</button>
      {image && <img src={image} alt="Fetched Image" />}
      </div> */}

      {/* <div>
      //////<input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      </div> */}
      </div>
    )
  };
  
  export default ConfirmList;