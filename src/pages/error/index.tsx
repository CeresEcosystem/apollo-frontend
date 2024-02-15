import Form from '@components/form';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="h-screen background px-5 flex items-center justify-center">
      <Form>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold text-grey text-center text-3xl md:text-4xl lg:text-5xl">
            404 Error
          </h2>
          <p className="mt-5 text-base md:text-lg lg:text-xl">
            We couldn't find this page.
          </p>
          <Link
            to="/"
            className="outline-none mt-10 w-full bg-pinkButton rounded-3xl p-3 text-center"
          >
            <span className="font-semibold text-white">
              Go back to home page
            </span>
          </Link>
        </div>
      </Form>
    </div>
  );
}
