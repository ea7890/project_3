var app = app || {};

app.init = function () {
	// console.log('App init called');

	app.width = window.innerWidth;
	app.height = window.innerHeight;

	//camera
	app.camera = new THREE.PerspectiveCamera(
		50, window.innerWidth/window.innerHeight, 1, 1000);
	app.camera.position.z = 170;


	//scene
	app.scene = new THREE.Scene();
	app.scene.add(app.camera);

	// app.scene.add(new THREE.AmbientLight(0x333333));
	// app.light = new THREE.DirectionalLight(0xffffff, 1);
	// app.light.position.set(5,3,5);
	// app.scene.add(app.light);

	//renderer
	app.renderer = new THREE.WebGLRenderer();

	app.renderer.setSize(app.width, app.height);
	// app.renderer.setClearColor( 0x8771b7, 1 );

	console.log(app.renderer); 

	app.controls = new THREE.OrbitControls(app.camera, app.renderer.domElement);

	document.body.appendChild(app.renderer.domElement);

	app.renderer.render(app.scene, app.camera);

	
	app.addCircle();
	app.addClouds();
	app.animation();
}


app.addCircle = function() {
	//radius, segments, rings
	var shape = new THREE.SphereGeometry(50, 100, 30);

	var texture = THREE.ImageUtils.loadTexture( "images/noClouds.jpg" );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 1, 1 );

	var material = new THREE.MeshBasicMaterial({
		color: 0xffffff, 
		wireframe: false,
		map: texture,
		bumpMap: THREE.ImageUtils.loadTexture("images/bumpMap.jpg"),
		bumpScale:   0.005,
    	specularMap: THREE.ImageUtils.loadTexture('images/water.png'),
    	specular: new THREE.Color('grey')

		
	});



	app.sphere = new THREE.Mesh(shape, material);

	app.scene.add(app.sphere);

	app.renderer.render(app.scene, app.camera);

}

app.addClouds = function(){

	//radius, segments, rings
	var shape = new THREE.SphereGeometry(0.503, 32, 32);

	var texture = THREE.ImageUtils.loadTexture( "images/fairClouds.png" );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 1, 1 );

	var material = new THREE.MeshPhongMaterial({
		map: texture,
    	transparent: true    
	});


	app.clouds = new THREE.Mesh(shape, material);

	app.scene.add(app.clouds);

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


























