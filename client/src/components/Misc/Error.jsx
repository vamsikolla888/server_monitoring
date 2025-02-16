import { Link } from 'react-router-dom';
import { Images } from '@/assets/imageImports';
import CommonButton from '@/common/button/CommonButton';
const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center text-xl gap-3 py-6">
      <h2 className="mb-2 mx-2">Page Not Found :(</h2>
      <p className="mb-4 mx-2">
        Oops! 😖 The requested URL was not found on this server.
      </p>
      <div className="my-5">
        <img
          src={Images.ERRORIMAGE}
          alt="page-misc-error-light"
          aria-label="page misc error light"
          width="400"
          className="img-fluid"
          data-app-dark-img="illustrations/page-misc-error-dark.png"
          data-app-light-img="illustrations/page-misc-error-light.png"
        />
      </div>
      <Link
        aria-label="Go to Home Page"
        to="/"
        className="btn btn-primary mt-10"
      >
        <CommonButton className={'rounded-md px-10 py-2 bg-primary'}>
          Go to Home
        </CommonButton>
      </Link>
    </div>
  );
};

export default Error;
