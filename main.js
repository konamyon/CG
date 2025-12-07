/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");


class ThreeJSContainer {
    scene;
    light;
    staticSnowmen = [];
    cloud;
    particleVelocity = [];
    constructor() { }
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x495eed));
        renderer.shadowMap.enabled = true;
        const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    createSnowman = (withHat = false) => {
        const group = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        const head = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.5), new three__WEBPACK_IMPORTED_MODULE_1__.MeshNormalMaterial());
        const body = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.5), new three__WEBPACK_IMPORTED_MODULE_1__.MeshNormalMaterial());
        const eyeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0x000000 });
        const leftEye = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.1, 0.1, 0.1), eyeMaterial);
        const rightEye = leftEye.clone();
        const hat = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.ConeGeometry(0.5, 0.5, 32), new three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ color: 0xff0000 }));
        head.position.y = 1.0;
        body.position.y = 0.0;
        leftEye.position.set(-0.18, 1.0, 0.45);
        rightEye.position.set(0.18, 1.0, 0.45);
        hat.position.y = 1.6;
        hat.visible = withHat;
        group.add(body, head, leftEye, rightEye, hat);
        group.userData = { hat: hat, hatTimer: 0 };
        return group;
    };
    createParticles = () => {
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        const textureLoader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
        const texture = textureLoader.load('snowdrop.png');
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({
            size: 0.2,
            map: texture,
            blending: three__WEBPACK_IMPORTED_MODULE_1__.AdditiveBlending,
            color: 0xffffff,
            depthWrite: false,
            transparent: true,
            opacity: 0.5
        });
        const particleNum = 10000;
        const positions = new Float32Array(particleNum * 3);
        this.particleVelocity = [];
        for (let i = 0; i < particleNum; i++) {
            positions[i * 3 + 0] = 20 * Math.random() - 10;
            positions[i * 3 + 1] = 10 * Math.random();
            positions[i * 3 + 2] = 20 * Math.random() - 10;
            this.particleVelocity.push(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -(0.5 + Math.random() * 4.5), 0));
        }
        geometry.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(positions, 3));
        this.cloud = new three__WEBPACK_IMPORTED_MODULE_1__.Points(geometry, material);
        this.scene.add(this.cloud);
    };
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        this.createParticles();
        const obj = this.createSnowman(true);
        this.scene.add(obj);
        const positions = [
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(5, 0, -5),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(5, 0, 5),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-5, 0, 5),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-5, 0, -5),
        ];
        for (let pos of positions) {
            const snowman = this.createSnowman(false);
            snowman.position.copy(pos);
            this.scene.add(snowman);
            this.staticSnowmen.push(snowman);
        }
        const planeGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(20, 20);
        const planeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xffffff });
        const plane = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.5;
        this.scene.add(plane);
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        const clock = new three__WEBPACK_IMPORTED_MODULE_1__.Clock();
        let t = 0;
        let seg = 0;
        const points = [
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(4, 0, -4), new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(4, 0, 4), new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-4, 0, 4), new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-4, 0, -4), new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0),
            new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(4, 0, -4), new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0),
        ];
        const hermite = (p0, v0, p1, v1, t) => {
            return p0.clone().clone().multiplyScalar((2 * t + 1) * (1.0 - t) ** 2).clone().add(v0.clone().clone().multiplyScalar(t * (1 - t) ** 2)).clone().add(p1.clone().clone().multiplyScalar(t ** 2 * (3 - 2 * t))).clone().add(v1.clone().clone().multiplyScalar(-1 * t ** 2 * (1 - t)));
        };
        const update = () => {
            const delta = clock.getDelta();
            t += delta;
            if (t > 1.0) {
                t -= 1.0;
                seg = (seg + 1) % 4;
            }
            const pos = hermite(points[seg * 2], points[seg * 2 + 1], points[seg * 2 + 2], points[seg * 2 + 3], t);
            obj.position.copy(pos);
            const futurePos = hermite(points[seg * 2], points[seg * 2 + 1], points[seg * 2 + 2], points[seg * 2 + 3], Math.min(t + 0.01, 1.0));
            obj.lookAt(futurePos);
            for (const snowman of this.staticSnowmen) {
                const hat = snowman.userData.hat;
                const dist = obj.position.distanceTo(snowman.position);
                if (dist < 1.5) {
                    hat.visible = true;
                    snowman.userData.hatTimer = 2.0;
                }
                else {
                    if (hat.visible) {
                        snowman.userData.hatTimer -= delta;
                        if (snowman.userData.hatTimer <= 0) {
                            hat.visible = false;
                        }
                    }
                }
            }
            if (this.cloud) {
                const positions = this.cloud.geometry.getAttribute("position");
                for (let i = 0; i < this.particleVelocity.length; i++) {
                    let y = positions.getY(i) + this.particleVelocity[i].y * delta;
                    if (y < -10)
                        y = 10;
                    positions.setY(i, y);
                }
                positions.needsUpdate = true;
            }
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    const container = new ThreeJSContainer();
    const viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 7, 13));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLzIzRkkwODEg5rC45baL6Iiq5aSnXHJcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzXCI7XHJcblxyXG5jbGFzcyBUaHJlZUpTQ29udGFpbmVyIHtcclxuICAgIHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xyXG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XHJcbiAgICBwcml2YXRlIHN0YXRpY1Nub3dtZW46IFRIUkVFLkdyb3VwW10gPSBbXTtcclxuICAgIHByaXZhdGUgY2xvdWQ6IFRIUkVFLlBvaW50cztcclxuICAgIHByaXZhdGUgcGFydGljbGVWZWxvY2l0eTogVEhSRUUuVmVjdG9yM1tdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcclxuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4NDk1ZWVkKSk7XHJcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xyXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcyk7XHJcbiAgICAgICAgY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xyXG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xyXG5cclxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XHJcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcclxuICAgICAgICByZXR1cm4gcmVuZGVyZXIuZG9tRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVNub3dtYW4gPSAod2l0aEhhdDogYm9vbGVhbiA9IGZhbHNlKTogVEhSRUUuR3JvdXAgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWQgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC41KSwgbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpKTtcclxuICAgICAgICBjb25zdCBib2R5ID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuNSksIG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKSk7XHJcbiAgICAgICAgY29uc3QgZXllTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDAwMDAwMCB9KTtcclxuICAgICAgICBjb25zdCBsZWZ0RXllID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMSwgMC4xLCAwLjEpLCBleWVNYXRlcmlhbCk7XHJcbiAgICAgICAgY29uc3QgcmlnaHRFeWUgPSBsZWZ0RXllLmNsb25lKCk7XHJcbiAgICAgICAgY29uc3QgaGF0ID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkNvbmVHZW9tZXRyeSgwLjUsIDAuNSwgMzIpLCBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmMDAwMCB9KSk7XHJcblxyXG4gICAgICAgIGhlYWQucG9zaXRpb24ueSA9IDEuMDtcclxuICAgICAgICBib2R5LnBvc2l0aW9uLnkgPSAwLjA7XHJcbiAgICAgICAgbGVmdEV5ZS5wb3NpdGlvbi5zZXQoLTAuMTgsIDEuMCwgMC40NSk7XHJcbiAgICAgICAgcmlnaHRFeWUucG9zaXRpb24uc2V0KDAuMTgsIDEuMCwgMC40NSk7XHJcbiAgICAgICAgaGF0LnBvc2l0aW9uLnkgPSAxLjY7XHJcbiAgICAgICAgaGF0LnZpc2libGUgPSB3aXRoSGF0O1xyXG5cclxuICAgICAgICBncm91cC5hZGQoYm9keSwgaGVhZCwgbGVmdEV5ZSwgcmlnaHRFeWUsIGhhdCk7XHJcbiAgICAgICAgZ3JvdXAudXNlckRhdGEgPSB7IGhhdDogaGF0LCBoYXRUaW1lcjogMCB9O1xyXG4gICAgICAgIHJldHVybiBncm91cDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVQYXJ0aWNsZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGV4dHVyZUxvYWRlci5sb2FkKCdzbm93ZHJvcC5wbmcnKTtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XHJcbiAgICAgICAgICAgIHNpemU6IDAuMixcclxuICAgICAgICAgICAgbWFwOiB0ZXh0dXJlLFxyXG4gICAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcclxuICAgICAgICAgICAgY29sb3I6IDB4ZmZmZmZmLFxyXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBwYXJ0aWNsZU51bSA9IDEwMDAwO1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocGFydGljbGVOdW0gKiAzKTtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlVmVsb2NpdHkgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyBpKyspIHtcclxuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMF0gPSAyMCAqIE1hdGgucmFuZG9tKCkgLSAxMDtcclxuICAgICAgICAgICAgcG9zaXRpb25zW2kgKiAzICsgMV0gPSAxMCAqIE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uc1tpICogMyArIDJdID0gMjAgKiBNYXRoLnJhbmRvbSgpIC0gMTA7XHJcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVWZWxvY2l0eS5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKDAsIC0oMC41ICsgTWF0aC5yYW5kb20oKSAqIDQuNSksIDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdlb21ldHJ5LnNldEF0dHJpYnV0ZShcInBvc2l0aW9uXCIsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XHJcbiAgICAgICAgdGhpcy5jbG91ZCA9IG5ldyBUSFJFRS5Qb2ludHMoZ2VvbWV0cnksIG1hdGVyaWFsKTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmNsb3VkKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVQYXJ0aWNsZXMoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JqID0gdGhpcy5jcmVhdGVTbm93bWFuKHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLnNjZW5lLmFkZChvYmopO1xyXG5cclxuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDUsIDAsIC01KSxcclxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoNSwgMCwgNSksXHJcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC01LCAwLCA1KSxcclxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTUsIDAsIC01KSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBwb3Mgb2YgcG9zaXRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNub3dtYW4gPSB0aGlzLmNyZWF0ZVNub3dtYW4oZmFsc2UpO1xyXG4gICAgICAgICAgICBzbm93bWFuLnBvc2l0aW9uLmNvcHkocG9zKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQoc25vd21hbik7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGljU25vd21lbi5wdXNoKHNub3dtYW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGxhbmVHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDIwLCAyMCk7XHJcbiAgICAgICAgY29uc3QgcGxhbmVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcclxuICAgICAgICBjb25zdCBwbGFuZSA9IG5ldyBUSFJFRS5NZXNoKHBsYW5lR2VvbWV0cnksIHBsYW5lTWF0ZXJpYWwpO1xyXG4gICAgICAgIHBsYW5lLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XHJcbiAgICAgICAgcGxhbmUucG9zaXRpb24ueSA9IC0wLjU7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocGxhbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYpO1xyXG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcclxuICAgICAgICB0aGlzLmxpZ2h0LnBvc2l0aW9uLnNldChsdmVjLngsIGx2ZWMueSwgbHZlYy56KTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcclxuICAgICAgICBsZXQgdCA9IDA7XHJcbiAgICAgICAgbGV0IHNlZyA9IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvaW50cyA9IFtcclxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoNCwgMCwgLTQpLCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoNCwgMCwgNCksIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygtNCwgMCwgNCksIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApLFxyXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygtNCwgMCwgLTQpLCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoNCwgMCwgLTQpLCBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBjb25zdCBoZXJtaXRlID0gKHAwOiBUSFJFRS5WZWN0b3IzLCB2MDogVEhSRUUuVmVjdG9yMyxcclxuICAgICAgICAgICAgcDE6IFRIUkVFLlZlY3RvcjMsIHYxOiBUSFJFRS5WZWN0b3IzLCB0OiBudW1iZXIpOiBUSFJFRS5WZWN0b3IzID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHAwLmNsb25lKCkubXVsdGlwbHlTY2FsYXIoKDIgKiB0ICsgMSkgKiAoMS4wIC0gdCkgKiogMilcclxuICAgICAgICAgICAgICAgIC5hZGQodjAuY2xvbmUoKS5tdWx0aXBseVNjYWxhcih0ICogKDEgLSB0KSAqKiAyKSlcclxuICAgICAgICAgICAgICAgIC5hZGQocDEuY2xvbmUoKS5tdWx0aXBseVNjYWxhcih0ICoqIDIgKiAoMyAtIDIgKiB0KSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkKHYxLmNsb25lKCkubXVsdGlwbHlTY2FsYXIoLTEgKiB0ICoqIDIgKiAoMSAtIHQpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkZWx0YSA9IGNsb2NrLmdldERlbHRhKCk7XHJcblxyXG4gICAgICAgICAgICB0ICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodCA+IDEuMCkge1xyXG4gICAgICAgICAgICAgICAgdCAtPSAxLjA7XHJcbiAgICAgICAgICAgICAgICBzZWcgPSAoc2VnICsgMSkgJSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBoZXJtaXRlKHBvaW50c1tzZWcgKiAyXSwgcG9pbnRzW3NlZyAqIDIgKyAxXSwgcG9pbnRzW3NlZyAqIDIgKyAyXSwgcG9pbnRzW3NlZyAqIDIgKyAzXSwgdCk7XHJcbiAgICAgICAgICAgIG9iai5wb3NpdGlvbi5jb3B5KHBvcyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmdXR1cmVQb3MgPSBoZXJtaXRlKHBvaW50c1tzZWcgKiAyXSwgcG9pbnRzW3NlZyAqIDIgKyAxXSwgcG9pbnRzW3NlZyAqIDIgKyAyXSwgcG9pbnRzW3NlZyAqIDIgKyAzXSwgTWF0aC5taW4odCArIDAuMDEsIDEuMCkpO1xyXG4gICAgICAgICAgICBvYmoubG9va0F0KGZ1dHVyZVBvcyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNub3dtYW4gb2YgdGhpcy5zdGF0aWNTbm93bWVuKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYXQ6IFRIUkVFLk1lc2ggPSBzbm93bWFuLnVzZXJEYXRhLmhhdDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBvYmoucG9zaXRpb24uZGlzdGFuY2VUbyhzbm93bWFuLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IDEuNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhdC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzbm93bWFuLnVzZXJEYXRhLmhhdFRpbWVyID0gMi4wO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGF0LnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc25vd21hbi51c2VyRGF0YS5oYXRUaW1lciAtPSBkZWx0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNub3dtYW4udXNlckRhdGEuaGF0VGltZXIgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGF0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvdWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IHRoaXMuY2xvdWQuZ2VvbWV0cnkuZ2V0QXR0cmlidXRlKFwicG9zaXRpb25cIikgYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlVmVsb2NpdHkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IHBvc2l0aW9ucy5nZXRZKGkpICsgdGhpcy5wYXJ0aWNsZVZlbG9jaXR5W2ldLnkgKiBkZWx0YTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeSA8IC0xMCkgeSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5zZXRZKGksIHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBuZXcgVGhyZWVKU0NvbnRhaW5lcigpO1xyXG4gICAgY29uc3Qgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDcsIDEzKSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250cm9sc19PcmJpdENvbnRyb2xzX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9