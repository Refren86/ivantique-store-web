import { secrets } from 'utils/constants';

export const loadOptions = async () => {
  const data = fetch(`${secrets.BASE_URL}/api/admin/get-options`).then((res) =>
    res.json()
  );

  return data;
};

export const loadCategories = async () => {
  const data = fetch(secrets.BASE_URL + '/api/admin/categories').then((res) =>
    res.json()
  );

  return data;
};

export const loadSlides = async () => {
  const data = fetch(secrets.BASE_URL + '/api/admin/slides').then((res) =>
    res.json()
  );

  return data;
};

export const loadFurniture = async () => {
  const data = fetch(secrets.BASE_URL + '/api/admin/furniture').then((res) =>
    res.json()
  );

  return data;
};
