import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Dropdown, AdminLayout } from 'components';
import { CheckboxDropdown } from 'components/CheckboxDropdown/CheckboxDropdown';

const AddFurniturePage = () => {
  const { register, handleSubmit } = useForm();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState(Array(10).fill(null));
  const [options, setOptions] = useState({
    styles: [],
    centuries: [],
    countries: [],
    materials: [],
  });
  const [selectedOptions, setSelectedOptions] = useState({
    style: '',
    century: '',
    country: '',
    materials: [],
  });

  useEffect(() => {
    fetch('/api/admin/get-options')
      .then((res) => res.json())
      .then((data) =>
        setOptions({
          styles: data.styles.map((style) => style.name),
          centuries: data.centuries.map((century) => century.name),
          countries: data.countries.map((country) => country.name),
          materials: data.materials.map((material) => material.name),
        })
      );
  }, []);

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

  const clearImages = () => {
    setImages(Array(10).fill(null));
  };

  const onSubmit = async (data) => {
    await fetch('/api/admin/furniture', {
      method: 'POST',
      body: JSON.stringify(data),
    });
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

  console.log(selectedOptions);

  return (
    <AdminLayout>
      <h2 className="text-grey-900 font-semibold text-xl">
        Додати нову мебель
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
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

        <div className='grid grid-cols-4 gap-x-4'>
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
          <Button onClick={clearImages} className="text-primary-400">
            Очистити
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="border-[2px] flex justify-center items-center border-dashed border-primary-600 rounded-[10px] min-h-[200px] relative"
              onDrop={(event) => handleDrop(event, index)}
              onDragOver={(event) => event.preventDefault()}
            >
              {image ? (
                <>
                  <Image
                    className="object-contain"
                    src={image}
                    alt={`Image ${index}`}
                    layout="fill"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0"
                    onClick={() => handleRemove(index)}
                  >
                    <Image
                      src={'/icons/common/x-circle.svg'}
                      alt="remove"
                      width={32}
                      height={32}
                    />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handlePlaceholderClick(index)}
                >
                  <Image
                    src={'/icons/common/img-file.png'}
                    alt="user img"
                    width={60}
                    height={60}
                  />
                </button>
              )}
            </div>
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
    </AdminLayout>
  );
};

export default AddFurniturePage;
