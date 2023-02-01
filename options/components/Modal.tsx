import { Children } from "react";

type Props = {
  visible: boolean;
  okText: string;
  cancelText: string;
  onOk?: () => void;
  onCancel: () => void;
  children: JSX.Element | JSX.Element[];
}


export default function Modal({ visible, onOk, onCancel, okText, cancelText, children }: Props) {
  if (visible) {
    return (
      <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div onClick={onCancel} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              {children}
            </div>
            <div className="mt-5 flex gap-4 sm:mt-6">
              <button onClick={onCancel}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-svm">
                {cancelText}
              </button>
              <button onClick={onOk}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-svm">
                {okText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }

}