import Modal from "@/Jetstream/Modal";
import {forwardRef} from "react";

const DialogModal = forwardRef(({show, title, content, footer, width, onClose, closeable = false}, focusRef) => (
    <Modal open={show} width={width} closeable={closeable} onClose={onClose} ref={focusRef}>
        <div className="px-6 py-4">
            <div className="text-lg">
                {title}
            </div>

            <div className="mt-4">
                {content}
            </div>
        </div>
        <div className="px-6 py-4 bg-gray-100 text-right">
            {footer}
        </div>
    </Modal>
));
export default DialogModal
