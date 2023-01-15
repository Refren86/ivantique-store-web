import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Modal } from 'components/Modal';
import { Input } from 'components/Input';
import { Accordion } from 'components/Accordion';
import { Button } from 'components/Button';
import { CartItem } from 'components/CartItem';
import { OrderValidator } from 'utils/validators';

export const OrderModal = ({
  isModalOpen,
  closeModal,
  furnitures,
  onSubmit,
  overallPrice,
}) => {
  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: 'onTouched',
    resolver: joiResolver(OrderValidator),
  });

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <div>
        <p className="max-w-[80%] mx-auto text-center text-lg font-semibold">
          Заповніть свої дані і продавець з Вами зв'яжеться
        </p>

        <Input
          id="client"
          label="Ваше ім'я"
          placeholder="Ваше ім'я"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="clientPhone"
          label="Ваш номер телефону"
          placeholder="Ваш номер телефону"
          register={register}
          errors={errors}
          defaultValue="+380"
          required
        />

        <textarea
          name="question"
          className="peer w-full border-b-2 border-grey-400 text-grey-900 focus:outline-none focus:border-secondary-500 resize-none"
          placeholder="Задайте питання продавцю (не обов'язково)"
          rows={3}
          {...register('question')}
        />

        <Accordion
          title="Деталі"
          content={
            <div>
              <p className="font-semibold">Ви замовляєте:</p>

              {furnitures?.map((furniture) => (
                <CartItem
                  key={furniture.slug}
                  furniture={furniture}
                  className="text-center"
                />
              ))}

              <div className="border-b border-b-grey-500" />

              <h4 className="text-lg font-semibold text-right p-3">
                Загалом: €{overallPrice}
              </h4>
            </div>
          }
        />

        <Button
          disabled={!isValid}
          variant="secondary-btn"
          className="w-full"
          onClick={() => onSubmit(getValues())}
        >
          Замовити
        </Button>
      </div>
    </Modal>
  );
};
