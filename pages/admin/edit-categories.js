import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AdminLayout, Button, ImageDropbox, Input } from 'components';

export const getStaticProps = async () => {
  const { categories } = await fetch(
    'http://localhost:3000/api/admin/categories'
  ).then((res) => res.json());

  return {
    props: {
      categoriesData: categories,
    },
    revalidate: 60, // Number of seconds before revalidating the data
  };
};

const EditCategoriesPage = ({ categoriesData }) => {
  const fileInputRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  const [categories, setCategories] = useState(categoriesData || []);
  const [newCategoryImg, setNewCategoryImg] = useState('');

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (!files[0].type.includes('image/')) {
      toast.error('Файл не є зображенням');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setNewCategoryImg(e.target.result);
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
      setNewCategoryImg(e.target.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleRemoveImage = () => {
    setNewCategoryImg('');
  };

  const submit = async (data) => {
    if (newCategoryImg && data.title) {
      const formData = new FormData();
      formData.append('category', newCategoryImg);

      const { images } = await fetch('/api/images/upload/categories', {
        method: 'post',
        body: formData,
      }).then((res) => res.json());

      const { category: newCategory } = await fetch('/api/admin/categories', {
        method: 'post',
        body: JSON.stringify({ title: data.title, image: images[0] }),
      }).then((res) => res.json());

      setCategories((prevCategories) => [
        ...(prevCategories || []),
        newCategory,
      ]);

      handleRemoveImage();
      reset();
    }
  };

  const handleDelete = async (category) => {
    await fetch('/api/images/delete', {
      method: 'delete',
      body: JSON.stringify({ images: [category.image], folder: 'categories' }),
    }).then((res) => res.json());

    await fetch('/api/admin/categories', {
      method: 'delete',
      body: JSON.stringify(category._id),
    }).then((res) => res.json());

    setCategories((prevCategories) =>
      prevCategories.filter((c) => c._id !== category._id)
    );
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit(submit)} className="max-w-lg">
        {categories.length > 0 &&
          categories.map((category, index) => (
            <div className="pb-2" key={category.image}>
              <Input
                defaultValue={category.title}
                id={category.title}
                placeholder={category.title}
                disabled
              />

              <ImageDropbox image={category.image} />

              <div className="text-end mt-3">
                <Button
                  variant="error-btn"
                  onClick={() => handleDelete(category)}
                >
                  Видалити
                </Button>
              </div>
            </div>
          ))}

        <Input
          register={register}
          id="title"
          label={`Назва нової категорії`}
          placeholder={`Назва нової категорії`}
        />

        <ImageDropbox
          image={newCategoryImg}
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

EditCategoriesPage.auth = true;

export default EditCategoriesPage;
