import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { TrackballControls } from "three/examples/jsm/controls//TrackballControls";

//import { HDRCubeTextureLoader } from "three/examples/jsm/loaders/HDRCubeTextureLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import elementModal from "./elementModal";
import submitModal from "./submitModal";

import plsAttr from "../data/pls_attr2.json";
import usageData from "../data/speciesData.json";
console.log(usageData);
import hdrImg from "../resources/misty_pines_2k.hdr";

function spaceSection(DATA_TABLE) {
  const elModal = elementModal();
  const submitM = new submitModal(DATA_TABLE);

  const submitBtn = document.querySelector("#open-submit-modal");
  submitBtn.addEventListener("click", function (e) {
    submitM.open();
  });

  console.log(hdrImg);
  // For raycasting stuff
  let raycaster;
  const mouse = new THREE.Vector2();
  let INTERSECTED;
  let SELECTED;

  //   Three.js variables
  let perspectiveCamera, orthographicCamera, controls, scene, renderer, stats;

  //   Camera parameters
  const params = {
    orthographicCamera: false,
  };
  const frustumSize = 400;

  init();
  animate();

  function init() {
    const aspect = window.innerWidth / window.innerHeight;

    perspectiveCamera = new THREE.PerspectiveCamera(60, aspect, 1, 2000);
    perspectiveCamera.position.z = 200;
    perspectiveCamera.position.x = 200;
    perspectiveCamera.position.y = 200;

    orthographicCamera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      1000
    );
    orthographicCamera.position.z = 500;

    // world

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load(hdrImg, function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        scene.background = envMap;
        scene.environment = envMap;

        texture.dispose();
        pmremGenerator.dispose();

        render();
      });

    // Create Elements and populate the scene
    createItems(plsAttr.length, scene);

    // Create the Axis Lines
    createLines(scene);

    // lights

    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    raycaster = new THREE.Raycaster();

    // renderer
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    //renderer.physicallyCorrectLights = true;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const space = document.querySelector("#space");
    space.appendChild(renderer.domElement);

    stats = new Stats();
    //space.appendChild(stats.dom);

    //
    // const gui = new GUI();
    // gui
    //   .add(params, "orthographicCamera")
    //   .name("use orthographic")
    //   .onChange(function (value) {
    //     controls.dispose();

    //     createControls(value ? orthographicCamera : perspectiveCamera);
    //   });

    window.addEventListener("mousemove", onDocumentMouseMove);
    space.addEventListener("click", onMouseClick);
    window.addEventListener("resize", onWindowResize);

    createControls(perspectiveCamera);
  }

  function createItems(n, scene) {
    //const geometry = new THREE.OctahedronGeometry(5);
    const geometry = new THREE.TetrahedronGeometry(5);
    const material = { color: 0x00ffff, flatShading: false };

    for (let i = 0; i < n; i++) {
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial(material)
      );
      mesh.position.x = parseFloat(plsAttr[i].troot) * 30;
      mesh.position.y = parseFloat(plsAttr[i].twood) * 5;
      mesh.position.z = parseFloat(plsAttr[i].tleaf) * 30;

      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;

      //   mesh.position.x = (Math.random() - 0.5) * 1000;
      //   mesh.position.y = (Math.random() - 0.5) * 1000;
      //   mesh.position.z = (Math.random() - 0.5) * 1000;

      mesh.userData = {
        plsData: plsAttr[i],
        usageData: usageData[i],
        position: {
          x: mesh.position.x,
          y: mesh.position.y,
          z: mesh.position.z,
        },
      };

      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      scene.add(mesh);
    }
  }

  function createElements(n, scene) {
    const geometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1);

    // const material = new THREE.MeshPhongMaterial({
    //   color: 0xffffff,
    //   flatShading: true,
    // });
    const material = { color: 0x00ffff, flatShading: true };

    for (let i = 0; i < n; i++) {
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial(material)
      );
      mesh.position.x = parseFloat(plsAttr[i].aroot) * 300;
      mesh.position.y = parseFloat(plsAttr[i].awood) * 300;
      mesh.position.z = parseFloat(plsAttr[i].aleaf) * 300;
      //   mesh.position.x = (Math.random() - 0.5) * 1000;
      //   mesh.position.y = (Math.random() - 0.5) * 1000;
      //   mesh.position.z = (Math.random() - 0.5) * 1000;

      mesh.userData = {
        plsData: plsAttr[i],
        usageData: usageData[i],
        position: {
          x: mesh.position.x,
          y: mesh.position.y,
          z: mesh.position.z,
        },
      };

      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      scene.add(mesh);
    }
  }

  function createLines(scene) {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0fffff });

    const xAxis = [];
    xAxis.push(new THREE.Vector3(0, 0, 0));
    xAxis.push(new THREE.Vector3(200, 0, 0));
    const xAxisLineGeometry = new THREE.BufferGeometry().setFromPoints(xAxis);
    const xAxisLine = new THREE.Line(xAxisLineGeometry, lineMaterial);
    scene.add(xAxisLine);

    const yAxis = [];
    yAxis.push(new THREE.Vector3(0, 0, 0));
    yAxis.push(new THREE.Vector3(0, 200, 0));
    const yAxisLineGeometry = new THREE.BufferGeometry().setFromPoints(yAxis);
    const yAxisLine = new THREE.Line(yAxisLineGeometry, lineMaterial);
    scene.add(yAxisLine);

    const zAxis = [];
    zAxis.push(new THREE.Vector3(0, 0, 0));
    zAxis.push(new THREE.Vector3(0, 0, 200));
    const zAxisLineGeometry = new THREE.BufferGeometry().setFromPoints(zAxis);
    const zAxisLine = new THREE.Line(zAxisLineGeometry, lineMaterial);
    scene.add(zAxisLine);
  }

  function createControls(camera) {
    controls = new TrackballControls(camera, renderer.domElement);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.keys = [65, 83, 68];
  }

  function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    perspectiveCamera.aspect = aspect;
    perspectiveCamera.updateProjectionMatrix();

    orthographicCamera.left = (-frustumSize * aspect) / 2;
    orthographicCamera.right = (frustumSize * aspect) / 2;
    orthographicCamera.top = frustumSize / 2;
    orthographicCamera.bottom = -frustumSize / 2;
    orthographicCamera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.handleResize();
  }

  function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onMouseClick(event) {
    if (!SELECTED) {
      if (INTERSECTED && INTERSECTED.type !== "Line") {
        INTERSECTED.scale.x++;
        INTERSECTED.scale.y++;
        INTERSECTED.scale.z++;
        INTERSECTED.updateMatrix();
        SELECTED = INTERSECTED;
        elModal.open(SELECTED);
      }
    }
  }

  console.log(elModal);
  elModal.modal.addEventListener("closed", (e) => {
    SELECTED = null;
  });

  elModal.modal.addEventListener("deleteElement", (e) => {
    console.log(DATA_TABLE);
    DATA_TABLE.push({ uuid: e.detail.uuid, data: e.detail.userData });
    console.log(DATA_TABLE);
    console.log(e);
    const obj = scene.getObjectByProperty("uuid", e.detail.uuid);
    obj.geometry.dispose();
    obj.material.dispose();
    scene.remove(obj);
    renderer.renderLists.dispose();
    SELECTED = null;
  });

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    stats.update();

    render();
  }

  function render() {
    const camera = params.orthographicCamera
      ? orthographicCamera
      : perspectiveCamera;

    // find intersections

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      if (intersects[0].object.type === "Line") {
        //console.log(intersects[0].object);
      } else {
        if (INTERSECTED != intersects[0].object) {
          if (INTERSECTED)
            INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

          INTERSECTED = intersects[0].object;

          INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
          INTERSECTED.material.emissive.setHex(0xff0000);
        }
      }
    } else {
      if (INTERSECTED)
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

      INTERSECTED = null;
    }

    renderer.render(scene, camera);
  }
}

export default spaceSection;
