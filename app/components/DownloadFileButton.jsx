const DownloadFileButton = (url) => {
  const handleDownloadFile = async () => {
    if (!url) {
      return;
    }

    const a = document.createElement("a");
    a.href = url;
    a.download = "test-download-file.pdf";
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="btn btn-outline mx-3" onClick={handleDownloadFile}>
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19 10V4a1 1 0 0 0-1-1H9.914a1 1 0 0 0-.707.293L5.293 7.207A1 1 0 0 0 5 7.914V20a1 
            1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2M10 3v4a1 1 0 0 1-1 1H5m5 6h9m0 0-2-2m2 2-2 2"
        />
      </svg>
      ดาวน์โหลด
    </button>
  );
};
export default DownloadFileButton;
