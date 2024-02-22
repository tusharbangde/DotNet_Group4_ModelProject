import { UploadDropzone } from "@bytescale/upload-widget-react";

// Full Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
const options = {
    apiKey: "free", // Get API keys from: www.bytescale.com
    maxFileCount: 2,
    mimeTypes: ["pdf"],
};

const FileUpload = () => (
    <UploadDropzone options={options}
        onUpdate={({ uploadedFiles }) => {
            console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))
        }}
        // mimeTypes= {["pdf/*"]}
        width="800px"
        height="250px"
    />
);


export default FileUpload;