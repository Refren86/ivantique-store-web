import toast from 'react-hot-toast';

const uid = () =>
  Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

const successToast = (text, duration = 4000) =>
  toast.success(
    (t) => <span onClick={() => toast.dismiss(t.id)}>{text}</span>,
    { duration }
  );

const errorToast = (text) =>
  toast.error((t) => <span onClick={() => toast.dismiss(t.id)}>{text}</span>);

export { uid, successToast, errorToast };
