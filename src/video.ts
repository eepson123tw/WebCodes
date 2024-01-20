const assetURL = "./frag_bunny.mp4";
const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

export function video() {
  const video = document.querySelector("video") as HTMLVideoElement;
  if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
    var mediaSource = new MediaSource();
    //console.log(mediaSource.readyState); // closed
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("sourceopen", sourceOpen);
  } else {
    console.error("Unsupported MIME type or codec: ", mimeCodec);
  }
}

function sourceOpen(this: MediaSource, _: Event) {
  const mediaSource = this;
  const video = document.querySelector("video") as HTMLVideoElement;

  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

  fetchAB(assetURL, function (buf: Buffer) {
    sourceBuffer.addEventListener("updateend", function (_) {
      mediaSource.endOfStream();
      video.play();
    });
    sourceBuffer.appendBuffer(buf);
  });
}

function fetchAB(url: string, cb: Function) {
  console.log({ url });
  var xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    cb(xhr.response);
  };
  xhr.send();
}

export function mainVideo() {
  if (!("VideoFrame" in window)) {
    document.body.innerHTML = "<h1>WebCodecs API is not supported.</h1>";
    return;
  }
  video();
  setTimeout(() => {
    startWorker();
  }, 100);
}
function startWorker() {
  let worker = new Worker("video-worker.js", { name: "Video worker" });

  worker.onmessage = function (e) {
    // Recreate worker in case of an error
    console.log("Worker error: " + e.data);
    worker.terminate();
    startWorker();
  };

  // Capture animation track for the source canvas
  let src_cnv = document.getElementById("video") as HTMLCanvasElement;
  const fps = 25;
  let stream = src_cnv.captureStream(fps);
  const track = stream.getVideoTracks()[0];
  //@ts-ignore
  const media_processor = new MediaStreamTrackProcessor(track);
  const reader = media_processor.readable;

  // Create a new destination canvas
  const dst_cnv = document.createElement("canvas");
  dst_cnv.width = 320;
  dst_cnv.height = 320;
  const dst = document.getElementById("mir");
  if (dst?.firstChild) dst.removeChild(dst.firstChild);
  dst?.appendChild(dst_cnv);
  let offscreen = dst_cnv.transferControlToOffscreen();
  worker.postMessage(
    {
      canvas: offscreen,
      frame_source: reader,
      fps: fps,
    },
    [offscreen, reader]
  );
}
