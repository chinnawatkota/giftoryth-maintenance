'use client';

import { OutlineButton } from '@/components/buttons';
import { ContactForm } from '@/components/forms';
import { EmailAddress, LineLink } from '@/constants/contact';

const MainFooter = () => {
  const onOrderByLine = () => {
    window.open(LineLink, '_blank');
  };

  const onOrderByEmail = () => {
    window.open(`mailto:${EmailAddress}`, '_blank');
  };

  return (
    <div>
      <footer className="footer justify-center px-10 pb-8 pt-4 text-base font-extralight text-shadow-black sm:footer-horizontal md:text-lg xl:text-xl">
        <div className="flex flex-col items-center gap-y-6">
          <OutlineButton
            color="primary"
            size="lg"
            className="mb-4"
            onClick={() =>
              (document.getElementById('open_catalog_dialog') as HTMLDialogElement)?.showModal()
            }
          >
            See the Catalog
          </OutlineButton>
          <dialog id="open_catalog_dialog" className="modal !rounded-none !p-0">
            <div className="modal-box w-full !rounded-none !p-0">
              <form method="dialog">
                <button className="btn btn-ghost btn-sm btn-circle absolute right-4 top-4">
                  ✕
                </button>
              </form>
              <ContactForm />
            </div>
          </dialog>
          <div className="mx-auto h-[2px] w-24 bg-shadow-black" />
          <div className="flex flex-col items-center sm:flex-row md:gap-4">
            <p
              onClick={onOrderByLine}
              className="cursor-pointer underline-offset-4 hover:text-maroon hover:underline"
            >
              Ordering via Line@giftory.th
            </p>
            or{' '}
            <p
              onClick={onOrderByEmail}
              className="cursor-pointer underline-offset-4 hover:text-maroon hover:underline"
            >
              Email to {EmailAddress}
            </p>
          </div>
        </div>
      </footer>
      <footer className="footer justify-center border-t border-shadow-black border-opacity-10 px-10 py-8 text-shadow-black">
        <aside className="grid-flow-col items-center gap-4 md:gap-6 lg:gap-10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="text-sm font-extralight md:text-base xl:text-lg">
            MAM Design and Service Co., Ltd.
            <br />
            Providing reliable since 2025
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default MainFooter;
