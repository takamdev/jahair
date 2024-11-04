import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type FormData = {
  file: FileList;
};

const Test: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);

    try {
      const response = await axios.post(`${import.meta.env.baseURL}/api/sauvefile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading the file', error);
    }
  };

  return (
   <>
    <form className='mt-28' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="file">choisir un fichier</label>
      <input id='file' type="file" {...register('file')} />
      <button type="submit">Upload</button>
    </form>
     <img src="https://drive.google.com/thumbnail?id=1CLzOXbcTdsQjG71g9NRi9M-5jOEfw33b&sz=s4000" alt="img" />
    
   
   </>
  );
  


};

export default Test;
