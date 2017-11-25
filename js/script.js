'use strict';

// smooth scroll nav
(function() {
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
}());

// lazy load images
(function() {
  var lazyScr = document.createElement('script');
  var ver = !('IntersectionObserver' in window) ? '8.5.2' : '10.3.5';

	lazyScr.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/' + ver + '/lazyload.min.js';
  lazyScr.async = true;
  lazyScr.onload = function() { console.log('got lazy load!') }
  document.body.appendChild(lazyScr);
}());

// rotating cube
(function() {
  var initCube = function() {
    var camera, scene, renderer;
    var geometry, material, mesh;

    var intro = document.getElementById('intro');
    var scrollTop = document.documentElement.scrollTop;
    var rendererHeight = intro.clientHeight;

    var init = function() {
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

      window.addEventListener('resize', function() {
        camera.aspect = intro.clientWidth / intro.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(intro.clientWidth, intro.clientHeight);

        scrollTop = document.documentElement.scrollTop;
        rendererHeight = intro.clientHeight;
      }, false);

      window.addEventListener('scroll', function() {
        scrollTop = document.documentElement.scrollTop;
      }, false);
    };

    var animate = function() {
      // only render if the cube is on screen
      if(scrollTop < rendererHeight) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        renderer.render(scene, camera);
      }

      requestAnimationFrame(animate);      
    };

    init();
    animate();
  }

  var threeScr = document.createElement('script');
  threeScr.src = 'https://cdn.jsdelivr.net/npm/three@0.88.0/build/three.min.js';
  threeScr.async = true;
  threeScr.onload = initCube
  document.body.appendChild(threeScr);
}());
