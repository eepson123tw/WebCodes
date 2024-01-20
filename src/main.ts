import { video, mainVideo } from "./video.ts";
import main from "./canvas.ts";

import "./style.css";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Video Test</h2>
    <video controls id="video"> </video>
    <div>    
    <button id="start" style="margin-right:5px">start use mediaSource</button>
    <button id="worker" style="margin-right:5px">use worker and canvas</button>
    <button id="mainVideo">use video and canvas</button>
    </div>    
    <div class="container">
      <canvas id="src" width="320" height="320"></canvas>
      <div id="mir" class="mir"></div>
    </div> 
  </div>
`;

document.querySelector("#start")?.addEventListener("click", video);
document.querySelector("#worker")?.addEventListener("click", main);
document.querySelector("#mainVideo")?.addEventListener("click", mainVideo);
