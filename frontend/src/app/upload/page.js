"use client";
import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { uploadFile } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handleUpload = async () => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadFile(formData);

      toast(response['status']);
      router.push("/ranking");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast("Failed to upload file")
    }
  
  
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Upload a File</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Drag and drop a file or click to select a .csv file from your device.
        </p>
      </div>
      <div
        {...getRootProps()}
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
      >
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <UploadIcon className="h-12 w-12 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Drag and drop your file here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              or click to select a file from your device
            </p>
          </div>
          <input
            {...getInputProps()}
            ref={inputRef}
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
          <Button onClick={handleButtonClick}>Choose File</Button>
        </div>
        {file && (
          <p className="mt-2 text-center text-sm text-gray-600">{file.name}</p>
        )}
      </div>
      <Button className="w-full" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}
