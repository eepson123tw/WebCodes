# WebCodes

這個專案展示了如何在瀏覽器中使用 Web Workers 來捕捉、處理、編碼、解碼，並渲染視頻流。

## 功能

- **視頻捕捉**: 從 `<canvas>` 元素捕捉實時視頻流。
- **多線程處理**: 使用 Web Worker 來處理視頻流，減少主線程負擔。
- **視頻編碼與解碼**: 使用 WebCodecs API 進行高效的視頻編解碼。
- **實時渲染**: 在網頁上實時渲染處理後的視頻。

## 如何開始

在開始之前，請確保您的環境支持最新的 Web APIs，包括 Web Workers 和 WebCodecs。

### 安裝

無需額外安裝步驟，直接在支持的瀏覽器中打開專案的 HTML 文件即可。

### 使用

1. 將 HTML 文件加載到瀏覽器中。
2. 透過網頁介面開始視頻捕捉和處理流程。

## 架構

- `main.ts` - 主要的 JavaScript 文件，包含視頻捕捉和初始化的邏輯。
- `video-worker.js` - Web Worker 文件，處理視頻編解碼。
- `index.html` - 網頁的主要 HTML 文件。

## 支持瀏覽器

本專案需要最新版本的瀏覽器，以支持以下技術：

- Web Workers
- WebCodecs API
- OffscreenCanvas

## 貢獻

我們歡迎所有形式的貢獻，包括新功能的提議、代碼改進、或錯誤報告。



