const fs = require('fs');

const html = fs.readFileSync('backup_html/tastemap.html', 'utf8');

// Extract CSS
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const css = cssMatch ? cssMatch[1] : '';

// Extract JS
const jsMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/);
let js = jsMatch ? jsMatch[1] : '';

// Extract Body HTML
const bodyMatch = html.match(/<body>([\s\S]*?)<script type="module">/);
let body = bodyMatch ? bodyMatch[1] : '';

// Convert HTML to JSX
body = body.replace(/class=/g, 'className=');
body = body.replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = p1.split(';').reduce((acc, rule) => {
        if (!rule.trim()) return acc;
        const parts = rule.split(':');
        const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc[key] = parts[1].trim();
        return acc;
    }, {});
    return `style={${JSON.stringify(styleObj)}}`;
});
// Self close img and input tags
body = body.replace(/<img(.*?)>/g, (match) => {
    if (match.endsWith('/>')) return match;
    return match.slice(0, -1) + ' />';
});
// Replace html entities
body = body.replace(/&amp;/g, '&');

// Prepare component
const component = `
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import './tastemap.css';

export default function TasteMap() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || containerRef.current.hasChildNodes()) return;
    
    // Create a scoped environment for the existing JS
    const initThreeJS = () => {
        ${js.replace(/document\.body\.appendChild\(renderer\.domElement\)/g, 'containerRef.current.appendChild(renderer.domElement)')}
    };

    try {
        initThreeJS();
    } catch(e) { console.error(e); }

    // Cleanup
    return () => {
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
        }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}></div>
      ${body}
    </>
  );
}
`;

fs.mkdirSync('app/tastemap', { recursive: true });
fs.writeFileSync('app/tastemap/page.jsx', component);
fs.writeFileSync('app/tastemap/tastemap.css', css);

console.log('Conversion complete!');
