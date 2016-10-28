var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: '18.22.8.128',
  port: 5000,
  path: '/car'
};

console.log("before_callback");

callback = function(response) {
	var str = '';

	//another chunk of data has been recieved, so append it to `str`
	response.on('data', function (chunk) {
	str += chunk;
	});


	//the whole response has been recieved, so we just print it out here
	response.on('end', function () {
    	console.log(str);

		if(str=="palmUp"){
			forward(127);
		}else if(str=="palmDown"){
			reverse(127);
		}else if(str=="pinky"){
			spin_right(127);
		}else if(str=="index"){
			spin_left(127);
		}else if(str=="fist"){
			stop();
		}

		http.request(options, callback).end();

	});

}

http.request(options, callback).end();

var groveMotorDriver_lib = require('jsupm_grovemd');
var i2c_addr1 = 15;
var i2c_addr2 = 10;

// Instantiate an I2C Grove Motor Driver on I2C address 0x0f with swtitches set to 1111 or 15 in decimal
var motor1 = new groveMotorDriver_lib.GroveMD(
	groveMotorDriver_lib.GROVEMD_I2C_BUS, i2c_addr1);

// Instantiate an I2C Grove Motor Driver on I2C address 0x0a with switches set to 1010 or 10 in decimal
	var motor2 = new groveMotorDriver_lib.GroveMD(
		groveMotorDriver_lib.GROVEMD_I2C_BUS, i2c_addr2);


function forward(speed)
{
	if (motor1 && motor2)
	{
		// set direction to CW and set speed to 50%
		console.log("motor 1 forward at " + speed);
		motor1.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CCW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CW);
		motor1.setMotorSpeeds(speed, speed);

		// set direction to CW and set speed to 50%
		console.log("motor 2 forward at " + speed);
		motor2.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CCW);
		motor2.setMotorSpeeds(speed, speed);
	}
}

function reverse(speed)
{
	if (motor1 && motor2)
	{
		// set direction to CW and set speed to 50%
		console.log("motor 1 forward at " + speed);
		motor1.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CCW);
		motor1.setMotorSpeeds(speed, speed);

		// set direction to CW and set speed to 50%
		console.log("motor 2 forward at " + speed);
		motor2.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CCW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CW);
		motor2.setMotorSpeeds(speed, speed);
	}
}

function spin_left(speed)
{
	if (motor1 && motor2)
	{
		// set direction to CW and set speed to 50%
		console.log("motor 1 forward at " + speed);
		motor1.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CCW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CCW);
		motor1.setMotorSpeeds(speed, speed);

		// set direction to CW and set speed to 50%
		console.log("motor 2 forward at " + speed);
		motor2.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CCW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CCW);
		motor2.setMotorSpeeds(speed, speed);
	}
}

function spin_right(speed)
{
	if (motor1 && motor2)
	{
		// set direction to CW and set speed to 50%
		console.log("motor 1 forward at " + speed);
		motor1.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CW);
		motor1.setMotorSpeeds(speed, speed);

		// set direction to CW and set speed to 50%
		console.log("motor 2 forward at " + speed);
		motor2.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CW);
		motor2.setMotorSpeeds(speed, speed);
	}
}

function stop()
{
	if (motor1 && motor2)
	{
		console.log("Stopping motors");
		motor1.setMotorSpeeds(0, 0);
    	motor2.setMotorSpeeds(0, 0);
	}
}

function end()
{
	if (motor1)
	{
		console.log("Stopping motors");
		motor1.setMotorSpeeds(0, 0);
	}
	exit();
}

// When exiting: clear memory and print exit message
function exit()
{
	if (motor1)
	{
		motor1 = null;
		groveMotorDriver_lib.cleanUp();
	}
	if (motor2)
	{
		motor2 = null;
		groveMotorDriver_lib.cleanUp();
	}
	groveMotorDriver_lib = null;
	console.log("Exiting");
	process.exit(0);
}




process.on('SIGINT', function()
{
	exit();
});
