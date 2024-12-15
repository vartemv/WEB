import { Device } from "@/types";
import { useDevice } from "./useDevice";

export const useDownloads = () => {

    const {createDevice} = useDevice();

    const photoUpload = async (file: File|null, name: string) => {
        if (!file || file.size > 10 * 1024 * 1024) { // 10MB limit
            return;
        }

        // Validate allowed file types
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        try {
            if (file) {
                const formDataWithFile = new FormData();
                const timestamp = Date.now();
                const filename = `user_photos/${timestamp}_${file.name.replaceAll(" ", "_")}`;
                formDataWithFile.append('file', new File([file], filename, { type: file.type }));

                const response = await createDevice({name: name, photo:filename});
                if (response.success) {
                    const uploadResponse = await fetch('/api/savePost', {
                        method: 'POST',
                        body: formDataWithFile
                    });
                    if (uploadResponse.ok) {
                        console.log('Device created successfully');
                    }
                } else {
                    return;
                }
            }

        } catch (error) {
            console.error("Error creating group:", error);
        }
    };

    return {photoUpload}
}