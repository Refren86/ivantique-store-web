import { useRouter } from 'next/router';

const UnauthorizedScreen = () => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <div>
      <h2 className="text-xl">Access Denied</h2>

      {/* we're accessing message from query string, after being redirected */}
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </div>
  );
};

export default UnauthorizedScreen;
