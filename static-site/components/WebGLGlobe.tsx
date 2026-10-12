"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
const vertex="attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}";
const fragment=[
"precision highp float;",
"uniform vec2 resolution;",
"uniform float clockTime;",
"uniform vec2 drag;",
"float star(vec2 p){vec2 id=floor(p*92.0);return step(.996,fract(sin(dot(id,vec2(12.9898,78.233)))*43758.5453));}",
"void main(){",
"vec2 uv=(gl_FragCoord.xy-resolution*.5)/min(resolution.x,resolution.y);",
"float radius=.345;float r=length(uv);",
"float mask=1.0-smoothstep(radius-.008,radius+.005,r);",
"float depth=sqrt(max(radius*radius-dot(uv,uv),0.0));",
"vec3 n=normalize(vec3(uv,depth));",
"float lon=atan(n.x,n.z)+clockTime*.09+drag.x;",
"float lat=asin(clamp(n.y,-1.0,1.0))+drag.y;",
"float gridA=1.0-smoothstep(.0,.046,abs(sin(lon*12.0)));",
"float gridB=1.0-smoothstep(.0,.051,abs(sin(lat*10.0)));",
"float grid=max(gridA,gridB);",
"float contour=sin(lon*4.0+sin(lat*7.0)*2.0)+cos(lat*9.0+sin(lon*5.0));",
"float pattern=smoothstep(.55,1.0,contour);",
"vec3 navy=vec3(.013,.10,.19);vec3 ocean=vec3(.035,.21,.31);vec3 gold=vec3(.89,.63,.31);",
"vec3 surface=mix(navy,ocean,pow(max(n.z,0.0),.65));",
"surface+=gold*grid*.56;surface+=gold*pattern*.09;",
"surface+=gold*pow(1.0-n.z,3.0)*.75;",
"float halo=pow(1.0-smoothstep(.32,.65,r),2.0)*.055;",
"vec3 background=vec3(.016,.09,.15)+vec3(.89,.64,.37)*star(uv)*.55;",
"vec3 color=mix(background,surface,mask);color+=vec3(.25,.42,.52)*halo*(1.0-mask);",
"gl_FragColor=vec4(color,1.0);",
"}"
].join("\n");
function shader(gl:WebGLRenderingContext,type:number,source:string){
 const sh=gl.createShader(type);if(!sh)return null;gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)){gl.deleteShader(sh);return null}return sh;
}
export default function WebGLGlobe(){
 const canvas=useRef<HTMLCanvasElement>(null),drag=useRef({x:0,y:0}),pointer=useRef<{x:number;y:number}|null>(null),[failed,setFailed]=useState(false);
 useEffect(()=>{const el=canvas.current;if(!el)return;const gl=el.getContext("webgl",{alpha:false,antialias:true,powerPreference:"low-power"});if(!gl){setFailed(true);return}
 const vs=shader(gl,gl.VERTEX_SHADER,vertex),fs=shader(gl,gl.FRAGMENT_SHADER,fragment);if(!vs||!fs){setFailed(true);return}
 const program=gl.createProgram();if(!program){setFailed(true);return}
 gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS)){setFailed(true);return}
 const vertexBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 gl.useProgram(program);const position=gl.getAttribLocation(program,"position");gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
 const res=gl.getUniformLocation(program,"resolution"),time=gl.getUniformLocation(program,"clockTime"),pan=gl.getUniformLocation(program,"drag");
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let frame=0,visible=false;
 const render=(t:number)=>{if(!el.isConnected||!visible)return;const dpr=Math.min(2,window.devicePixelRatio||1);const w=Math.max(1,Math.floor(el.clientWidth*dpr)),h=Math.max(1,Math.floor(el.clientHeight*dpr));if(el.width!==w||el.height!==h){el.width=w;el.height=h;gl.viewport(0,0,w,h)}
 gl.uniform2f(res,w,h);gl.uniform1f(time,reduced?0:t*.001);gl.uniform2f(pan,drag.current.x,drag.current.y);gl.drawArrays(gl.TRIANGLES,0,6);
 if(!reduced)frame=requestAnimationFrame(render)};
 const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting||false;cancelAnimationFrame(frame);if(visible)frame=requestAnimationFrame(render)},{threshold:.05});observer.observe(el);
 return()=>{observer.disconnect();cancelAnimationFrame(frame);gl.deleteBuffer(vertexBuffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs)}},[]);
 return <section className="kv3-globe-section"><div className="kv3-container kv3-globe-grid"><div className="kv3-globe-text"><span>INTERACTIVE WORLD • EXPLORE</span><h2>جهان بزرگ است.<br/><em>از کشفش شروع کن.</em></h2><p>کره سه‌بعدی تعاملی با رندر زنده WebGL؛ با لمس یا کشیدن آن می‌توانی زاویه دید را تغییر دهی و سپس راهنمای مقصدها را مرور کنی.</p><Link className="kv3-button kv3-button-gold" href="/visa-explorer/">کشف و مقایسه کشورها ↗</Link><small>اطلاعات کشورها با منابع رسمی تطبیق داده شود.</small></div><div className="kv3-globe-canvas"><div className="kv3-globe-ring"/>{failed?<div className="kv3-globe-fallback" role="img" aria-label="نمای تزئینی کره زمین">◎</div>:<canvas ref={canvas} width={600} height={600} role="img" aria-label="کره دیجیتال سه‌بعدی متحرک" onPointerDown={e=>{pointer.current={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(!pointer.current)return;drag.current.x+=(e.clientX-pointer.current.x)*.008;drag.current.y+=(e.clientY-pointer.current.y)*.004;pointer.current={x:e.clientX,y:e.clientY}}} onPointerUp={()=>pointer.current=null} onPointerCancel={()=>pointer.current=null}/>}<span className="kv3-globe-label">DRAG TO ROTATE — جابه‌جایی با لمس</span></div></div></section>
}
