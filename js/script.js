'use strict';

// rotating cube

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {
  var intro = document.getElementById('intro');

	camera = new THREE.PerspectiveCamera(70, intro.clientWidth / intro.clientHeight, 0.01, 10);
  camera.position.z = .2;
  camera.position.x = -.1;
  camera.position.y = -.05;
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffe359);  

	geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

	renderer.setSize(intro.clientWidth, intro.clientHeight);
	intro.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render(scene, camera);
}

// smooth scroll nav

var navLinks = document.querySelectorAll('nav a');

navLinks.forEach(function(navLink) {
  navLink.addEventListener('click', function(e) {
    e.preventDefault();
    var id = e.target.href.split('#').pop();

    document.getElementById(id).scrollIntoView({ 
      behavior: 'smooth',
    });
  });
});

// lazy load images

(function(w, d) {
  var s = d.createElement('script');
  var v = !('IntersectionObserver' in w) ? '8.5.2' : '10.3.5';

	s.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/' + v + '/lazyload.min.js';
  s.async = true;

  w.lazyLoadOptions = {};

	d.body.appendChild(s);
}(window, document));

