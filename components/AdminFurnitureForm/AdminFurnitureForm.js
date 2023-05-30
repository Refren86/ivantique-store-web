import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import {
  Button,
  Input,
  Dropdown,
  CheckboxDropdown,
  ImageDropbox,
} from 'components';

export const AdminFurnitureForm = ({ options }) => {
  const fileInputRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  const [images, setImages] = useState(Array(10).fill(null));

  const [selectedOptions, setSelectedOptions] = useState({
    style: '',
    century: '',
    country: '',
    category: '',
    materials: [],
  });

  const clearImages = () => {
    setImages(Array(10).fill(null));
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.includes('image/')) {
        toast.error('Файл не є зображенням');
        continue;
      }

      if (i < 10 - index) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages[index + i] = e.target.result;
          setImages([...newImages]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handlePlaceholderClick = (index) => {
    fileInputRef.current && fileInputRef.current.click();
    fileInputRef.current.onchange = (event) => {
      handleFileInputChange(event, index);
    };
  };

  const handleFileInputChange = (event, index) => {
    event.preventDefault();
    const files = event.target.files;

    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.includes('image/')) {
        toast.error('Файл не є зображенням');
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        newImages[index + i] = e.target.result;
        setImages([...newImages]);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleRemove = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages([...newImages]);
  };

  const resetForm = () => {
    clearImages();
    reset();
    setSelectedOptions({
      style: '',
      century: '',
      country: '',
      category: '',
      materials: [],
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const filteredImages = images.filter(Boolean);

    filteredImages.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    const imagesData = await fetch('/api/images/upload/furnitures', {
      method: 'post',
      body: formData,
    }).then((res) => res.json());

    const { images: imagesUrls } = imagesData;

    await fetch('/api/admin/furniture', {
      method: 'post',
      body: JSON.stringify({ ...data, ...selectedOptions, images: imagesUrls }),
    });

    resetForm();
  };

  const handleStyleSelect = (value) => {
    setSelectedOptions((prevOptions) => ({ ...prevOptions, style: value }));
  };

  const handleCenturySelect = (value) => {
    setSelectedOptions((prevOptions) => ({ ...prevOptions, century: value }));
  };

  const handleCountrySelect = (value) => {
    setSelectedOptions((prevOptions) => ({ ...prevOptions, country: value }));
  };

  const handleCategorySelect = (value) => {
    setSelectedOptions((prevOptions) => ({ ...prevOptions, category: value }));
  };

  const handleMaterialSelect = (selectedMaterial) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.materials.includes(selectedMaterial)) {
        return {
          ...prevOptions,
          materials: prevOptions.materials.filter(
            (material) => material !== selectedMaterial
          ),
        };
      } else {
        return {
          ...prevOptions,
          materials: [...prevOptions.materials, selectedMaterial],
        };
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8"
      encType="multipart/form-data"
    >
      <h2 className="text-grey-900 font-semibold text-xl">
        Додати нову мебель
      </h2>

      <div className="grid grid-cols-2 gap-x-6">
        <Input
          register={register}
          id="title"
          label="Заголовок"
          placeholder="Заголовок"
        />
        <Input
          register={register}
          id="description"
          label="Опис"
          placeholder="Опис"
        />
        <Input
          register={register}
          id="oldPrice"
          label="Стара ціна (євро)"
          placeholder="Стара ціна (євро)"
        />
        <Input
          register={register}
          id="newPrice"
          label="Нова ціна (євро)"
          placeholder="Нова ціна (євро)"
        />
      </div>

      <div className="grid grid-cols-3 gap-x-6">
        <Input
          register={register}
          id="height"
          label="Висота"
          placeholder="Висота"
        />
        <Input
          register={register}
          id="width"
          label="Ширина"
          placeholder="Ширина"
        />
        <Input
          register={register}
          id="depth"
          label="Глибина"
          placeholder="Глибина"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Dropdown
          label="Стиль"
          options={options?.styles}
          placeholder="Оберіть стиль"
          selectedOption={selectedOptions.style}
          onSelect={handleStyleSelect}
        />
        <Dropdown
          label="Століття"
          options={options?.centuries}
          placeholder="Оберіть століття"
          onSelect={handleCenturySelect}
          selectedOption={selectedOptions.century}
        />
        <Dropdown
          label="Країна"
          options={options?.countries}
          placeholder="Оберіть країну"
          selectedOption={selectedOptions.country}
          onSelect={handleCountrySelect}
        />
        <Dropdown
          label="Категорія"
          options={options?.categories}
          placeholder="Оберіть категорію"
          selectedOption={selectedOptions.category}
          onSelect={handleCategorySelect}
        />
        <CheckboxDropdown
          label="Матеріали"
          options={options?.materials}
          selectedOptions={selectedOptions?.materials}
          placeholder="Оберіть матеріали"
          onSelect={handleMaterialSelect}
        />
      </div>

      <div className="flex justify-between items-center my-4">
        <h4 className="text-lg">Оберіть фото</h4>
        <Button type='button' onClick={clearImages} className="text-primary-400">
          Очистити
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <ImageDropbox
            key={index}
            image={image}
            index={index}
            handleDrop={handleDrop}
            handlePlaceholderClick={handlePlaceholderClick}
            handleRemove={handleRemove}
          />
        ))}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        multiple
      />

      <div className="mt-8 text-center">
        <Button type="submit" variant="secondary-btn">
          Створити
        </Button>
      </div>
    </form>
  );
};
