"use client";

import { useEffect } from "react";
import DisableDevtool from "disable-devtool";

export default function DisableDevtools() {
  useEffect(() => {
    DisableDevtool({
      disableMenu: true,
      ondevtoolopen: (type, next) => {
        console.warn("⚠️ DevTools detected. Blocking access...");
        try {
          window.location.href =
            "about:blank";
        } catch {
          document.body.innerHTML = `
            <div style="
              height:100vh;
              display:flex;
              align-items:center;
              justify-content:center;
              flex-direction:column;
              background:#000;
              color:#fff;
              font-family:sans-serif;
              text-align:center;
            ">
              <h1>🔒 Access Blocked</h1>
              <p>Developer tools detected. Please close them to continue.</p>
            </div>
          `;
          document.body.style.pointerEvents = "none";
        }
      },
    });

    const devtoolsCheck = setInterval(() => {
      const threshold = 160;
      const start = performance.now();
      debugger;
      if (performance.now() - start > threshold) {
        document.body.innerHTML = `
          <div style="
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;
            background:#000;
            color:#fff;
            font-family:sans-serif;
            text-align:center;
          ">
            <h1>⚠️ Access Denied</h1>
            <p>Developer tools are open. Please close them to continue.</p>
          </div>
        `;
        document.body.style.pointerEvents = "none";
      }
    }, 2000);

    return () => clearInterval(devtoolsCheck);
  }, []);

  return null;
}