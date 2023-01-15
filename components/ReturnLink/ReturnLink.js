import Link from "next/link";
import Image from "next/image";

export const ReturnLink = () => {
  return (
    <div className="text-center">
      <Link href="/">
        <a className="inline-block text-lg hover:text-secondary-700 duration-150">
          <Image
            src="/icons/common/return.svg"
            alt="return"
            width={18}
            height={18}
          />
          <span className="ml-3 font-semibold">Вернутись на головну</span>
        </a>
      </Link>
    </div>
  );
}
