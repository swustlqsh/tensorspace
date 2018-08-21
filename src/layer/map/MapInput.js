import MapLayer from './MapLayer';
import FeatureMap from '../../elements/FeatureMap';
import ColorUtils from '../../utils/ColorUtils';

function MapInput(config) {

	MapLayer.call(this, config);

	this.shape = config.shape;
	this.width = config.shape[0];
	this.height = config.shape[1];
	this.depth = config.shape[2];
	this.neuralNum = config.shape[0] * config.shape[1];
	this.outputShape = config.shape;
	this.layerType = "input";
}

MapInput.prototype = Object.assign(Object.create(MapLayer.prototype), {

	init: function(center) {

		this.center = center;

		this.neuralGroup = new THREE.Group();
		this.neuralGroup.position.set(this.center.x, this.center.y, this.center.z);

		let inputMap = new FeatureMap(this.width, this.height, {x: 0, y: 0, z: 0});

		this.fmList.push(inputMap);

		this.neuralGroup.add(inputMap.getMapElement());

		this.scene.add(this.neuralGroup);

	},

	assemble: function(layerIndex) {
		console.log("Assemble input layer");

		this.layerIndex = layerIndex;
	},

	updateValue: function(value) {

		let greyPixelArray = ColorUtils.getColors(value);

		for (let i = 0; i < this.fmList.length; i++) {

			this.fmList[i].updateGrayScale(greyPixelArray);

		}

	}

});

export default MapInput;