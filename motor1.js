
var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
  if (key && key.name == 'w') {
    forward(127);

  }

  else if (key && key.name == 's') {
    reverse(127);

  }

  else if (key && key.name == 'a') {
    spin_left(127);

  }

  else if (key && key.name == 'd') {
    spin_right(127);

  }

  else{
    stop();
  }

});

process.stdin.setRawMode(true);
process.stdin.resume();

var groveMotorDriver_lib = require('jsupm_grovemd');
var i2c_addr1 = 15;


// Instantiate an I2C Grove Motor Driver on I2C address 0x0f with swtitches set to 1111 or 15 in decimal
var motor1 = new groveMotorDriver_lib.GroveMD(
	groveMotorDriver_lib.GROVEMD_I2C_BUS, i2c_addr1);



function forward(speed)
{
	if (motor1 )
	{
		// set direction to CW and set speed to 50%
		console.log("motor 1 forward at " + speed);
		motor1.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CCW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CW);
		motor1.setMotorSpeeds(speed, speed);

  	}
}

function reverse(speed)
{

	if (motor1 )
	{
		// set direction to CW and set speed to 50%
		console.log("motor 1 reverse at " + speed);
		motor1.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CCW);
		motor1.setMotorSpeeds(speed, speed);

	}
}

function spin_left(speed)
{
	if (motor1 )
	{
		// set direction to CW and set speed to 50%
		console.log("motor 1 left at " + speed);
		motor1.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CCW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CCW);
		motor1.setMotorSpeeds(speed, speed);

		
}

function spin_right(speed)
{
	if (motor1 && motor2)
	{
		// set direction to CW and set speed to 50%
		console.log("motor 1 right at " + speed);
		motor1.setMotorDirections(groveMotorDriver_lib.GroveMD.DIR_CW,
                                                     groveMotorDriver_lib.GroveMD.DIR_CW);
		motor1.setMotorSpeeds(speed, speed);


	}
}

function stop()
{
	if (motor1 )
	{
		console.log("Stopping motors");
		motor1.setMotorSpeeds(0, 0);
 
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
	
	
	groveMotorDriver_lib = null;
	console.log("Exiting");
	process.exit(0);
}

process.on('SIGINT', function()
{
	exit();
});
