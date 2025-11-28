import { useState } from "react";

export const useCopyClipboard = () => {
  const [copySuccess, setCopySuccess] = useState<boolean | null>(null);
  
  const handleCopyUrl = (value: string) => {
    if (!value || value.trim() === '') return;

    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value).catch((err) => {
          console.error('Failed to copy URL:', err);
        });
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      setCopySuccess(false);
      setTimeout(() => setCopySuccess(null), 2000);
    }
  }

  return {copySuccess, handleCopyUrl}
}