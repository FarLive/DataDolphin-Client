import { useEffect, useRef } from "react";

const UploadWidget = ({ onUpload, disabled }) => {
    const cloudinaryRef = useRef(null);
    const widgetRef = useRef(null);

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dm8n4mhaf",
            uploadPreset: "j3kqhqw4"
        }, (error, result) => {
            if (error) {
                console.error(error);
            } else if (result.event === "success") {
                const imageUrl = result.info.secure_url;
                onUpload(imageUrl);
            }
        });
    }, [onUpload]);

    return (
    <button
      onClick={() => widgetRef.current.open()}
      className="bg-blue-600 mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
      disabled={disabled}
    >
      Subir foto de perfil
    </button>
    );
}

export default UploadWidget;
