var app = app || {};

app.init = function () {
	// console.log('App init called');

	app.width = window.innerWidth;
	app.height = window.innerHeight;

	//camera
	app.camera = new THREE.PerspectiveCamera(
		45, window.innerWidth/window.innerHeight, 1, 1000);
	app.camera.position.z = 200;

	//scene
	app.scene = new THREE.Scene();
	app.scene.add(app.camera);

	//renderer
	app.renderer = new THREE.WebGLRenderer();

	app.renderer.setSize(app.width, app.height);
	app.renderer.setClearColor( 0xE3F2FD, 1 );

	console.log(app.renderer); 

	app.controls = new THREE.OrbitControls(app.camera, app.renderer.domElement);

	document.body.appendChild(app.renderer.domElement);

	app.renderer.render(app.scene, app.camera);

	
	app.addCircle();
	app.animation();
}


app.addCircle = function() {
	//radius, segments, rings
	var shape = new THREE.SphereGeometry(50, 16, 16);

	var material = new THREE.MeshBasicMaterial({
		color: 0x1A237E, 
		wireframe: true
	});

	app.sphere = new THREE.Mesh(shape, material);

	app.scene.add(app.sphere);

	app.renderer.render(app.scene, app.camera);

}

app.animation = function () {
	requestAnimationFrame( app.animation )

	app.renderer.render(app.scene, app.camera);

}

window.onload = app.init;


window.addEventListener("resize", function(){
	app.width = window.innerWidth;
	app.height = window.innerHeight;

	app.camera.aspect = app.width/app.height;

	app.camera.updateProjectionMatrix();

	app.renderer.setSize(app.width, app.height);

	app.renderer.render(app.scene, app.camera);


});


























