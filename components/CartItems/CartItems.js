import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { CartContext } from 'context';
import { errorToast, successToast } from 'helpers';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { CartItem } from 'components/CartItem';
import { OrderModal } from 'components/OrderModal';
import { secrets } from 'utils/constants';

export const CartItems = ({ furnitures }) => {
  const router = useRouter();
  const { clearCart } = useContext(CartContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const overallPrice = furnitures?.reduce((acc, item) => acc + item.newPrice, 0);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (router.query?.buy) {
      router.replace('/cart');
      openModal();
    }
  }, [Object.keys(router.query)?.length]);

  const submit = async (formData) => {
    const body = {
      ...formData,
      furnitures: furnitures.map((furniture) => ({
        name: furniture.name,
        furnitureId: furniture.id,
        price: furniture.newPrice,
      })),
      overallPrice,
    };

    const response = await fetch(`${secrets.API_URL}/api/order`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      closeModal();
      clearCart();
      alert('Success!');
      successToast('Успішно замовлено. Очікуйте на дзвінок');
    } else {
      errorToast('Помилка. Спробуйте пізніше');
    }
  };

  return (
    <>
      <div className="wrapper">
        <Title text="Корзина" />

        <div className="sm:w-[90%] mx-auto mt-2 border-t border-t-grey-700">
          {furnitures?.map((furniture) => (
            <CartItem key={furniture.slug} furniture={furniture} withRemove />
          ))}

          <div className="border-b border-b-grey-700" />

          <div className="mt-4 mb-14 flex items-center justify-between">
            <h4 className="font-bold text-xl">Загалом: €{overallPrice}</h4>

            <Button variant="primary-btn-contained" onClick={openModal}>
              ОФОРМИТИ ЗАМОВЛЕННЯ
            </Button>
          </div>
        </div>
      </div>

      <OrderModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        furnitures={furnitures}
        overallPrice={overallPrice}
        onSubmit={submit}
      />
    </>
  );
};
