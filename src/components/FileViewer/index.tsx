import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import "@cyntler/react-doc-viewer/dist/index.css";

import MarkdownRenderer from "./Viewers/MarkdownViewer";

/**
 * @description this viewer supports loading multiple files, it can load urls, local files, etc
 * @param url The url of the file to be displayed
 * @returns renders the file
 */
const FileViewer: React.FC<{ url: string }> = ({ url }) => {
  const docs = [{ uri: url }];

  return (
    <div className="bg-shade-50 rounded-lg shadow-sm max-h-[1050px] overflow-auto">
      <DocViewer
        documents={docs}
        pluginRenderers={[...DocViewerRenderers, MarkdownRenderer]}
        config={{
          header: {
            disableHeader: true,
            disableFileName: true,
          },
          pdfZoom: {
            defaultZoom: 0.8,
            zoomJump: 0.1,
          },
          pdfVerticalScrollByDefault: true,
        }}
        className="bg-shade-50"
      />
    </div>
  );
};

export default FileViewer;
