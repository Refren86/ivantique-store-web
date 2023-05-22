import { useState } from 'react';
import { AdminLayout, Button, Input } from 'components';

const AddOptionsPage = () => {
  const [optionsToAdd, setOptionsToAdd] = useState({
    style: '',
    century: '',
    country: '',
    material: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setOptionsToAdd((prevOptions) => ({ ...prevOptions, [name]: val }));
  };

  const addStyle = async () => {
    await fetch('/api/admin/add-style', {
      method: 'post',
      body: optionsToAdd.style,
    });

    setOptionsToAdd((prevOptions) => ({ ...prevOptions, style: '' }));
  };

  const addCentury = async () => {
    await fetch('/api/admin/add-century', {
      method: 'post',
      body: optionsToAdd.century,
    });
    setOptionsToAdd((prevOptions) => ({ ...prevOptions, century: '' }));
  };

  const addCountry = async () => {
    await fetch('/api/admin/add-country', {
      method: 'post',
      body: optionsToAdd.country,
    });
    setOptionsToAdd((prevOptions) => ({ ...prevOptions, country: '' }));
  };

  const addMaterial = async () => {
    await fetch('/api/admin/add-material', {
      method: 'post',
      body: optionsToAdd.material,
    });
    setOptionsToAdd((prevOptions) => ({ ...prevOptions, material: '' }));
  };

  return (
    <AdminLayout>
      <div className="max-w-xl space-y-12">
        <div>
          <h2 className="text-grey-900 font-semibold text-xl">Додати стиль</h2>

          <Input
            id="style"
            label="Стиль"
            placeholder="Стиль"
            value={optionsToAdd.style}
            onChange={handleChange}
          />

          <Button onClick={addStyle} variant="secondary-btn">
            Додати
          </Button>
        </div>

        <div>
          <h2 className="text-grey-900 font-semibold text-xl">
            Додати століття
          </h2>

          <Input
            id="century"
            label="Століття"
            placeholder="Століття"
            value={optionsToAdd.century}
            onChange={handleChange}
          />

          <Button onClick={addCentury} variant="secondary-btn">
            Додати
          </Button>
        </div>

        <div>
          <h2 className="text-grey-900 font-semibold text-xl">Додати країну</h2>

          <Input
            id="country"
            label="Назва країни"
            placeholder="Назва країни"
            value={optionsToAdd.country}
            onChange={handleChange}
          />

          <Button onClick={addCountry} variant="secondary-btn">
            Додати
          </Button>
        </div>

        <div>
          <h2 className="text-grey-900 font-semibold text-xl">Додати матеріал</h2>

          <Input
            id="material"
            label="Назва матеріалу"
            placeholder="Назва матеріалу"
            value={optionsToAdd.material}
            onChange={handleChange}
          />

          <Button onClick={addMaterial} variant="secondary-btn">
            Додати
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddOptionsPage;
