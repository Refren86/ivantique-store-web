import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AdminLayout, Button, ImageDropbox, Input } from 'components';

export const getServerSideProps = async () => {
  const slidesData = await fetch(
    'http://localhost:3000/api/admin/get-slides'
  ).then((res) => res.json());

  console.log(`slidesData >>>`, slidesData);

  return {
    props: {
      slidesData: slidesData.slides,
    },
  };
};

const EditSliderPage = ({ slidesData }) => {
  const fileInputRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  const [slides, setSlides] = useState(slidesData || []);
  const [newSliderImg, setNewSliderImg] = useState('');

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (!files[0].type.includes('image/')) {
      toast.error('Файл не є зображенням');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setNewSliderImg(e.target.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handlePlaceholderClick = (index) => {
    fileInputRef.current && fileInputRef.current.click();
    fileInputRef.current.onchange = (event) => {
      handleFileInputChange(event, index);
    };
  };

  const handleFileInputChange = (event) => {
    event.preventDefault();
    const files = event.target.files;

    if (!files[0].type.includes('image/')) {
      toast.error('Файл не є зображенням');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setNewSliderImg(e.target.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleRemoveImage = () => {
    setNewSliderImg('');
  };

  const submit = async (data) => {
    if (newSliderImg && data.title) {
      const formData = new FormData();
      formData.append('slide', newSliderImg);

      const { images } = await fetch('/api/images/upload/slides', {
        method: 'post',
        body: formData,
      }).then((res) => res.json());

      const { slide: newSlide } = await fetch('/api/admin/add-slide', {
        method: 'post',
        body: JSON.stringify({ title: data.title, image: images[0] }),
      }).then((res) => res.json());

      setSlides((prevSlides) => [...(prevSlides || []), newSlide]);

      handleRemoveImage();
      reset();
    }
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(submit)} className="max-w-lg">
        {slides.length > 0 &&
          slides.map((slide, index) => (
            <div className="pb-2" key={slide.image}>
              <Input
                defaultValue={slide.title}
                id={`slide-${index + 1}`}
                label={`Текст слайду ${index + 1}`}
                placeholder={`Текст слайду ${index + 1}`}
                disabled
              />

              <ImageDropbox
                image={slide.image}
                handleDrop={handleDrop}
                handlePlaceholderClick={handlePlaceholderClick}
              />

              <div className="text-end mt-3">
                <Button variant="error-btn">Видалити</Button>
              </div>
            </div>
          ))}

        <Input
          register={register}
          id="title"
          label={`Текст слайду ${slides.length + 1}`}
          placeholder={`Текст слайду ${slides.length + 1}`}
        />

        <ImageDropbox
          image={newSliderImg}
          handleDrop={handleDrop}
          handlePlaceholderClick={handlePlaceholderClick}
          handleRemove={handleRemoveImage}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
        />

        <div className="mt-6">
          <Button type="submit" variant="secondary-btn">
            Зберегти
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditSliderPage;
