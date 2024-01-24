// Class used to draw a PerlinNoise drawing
class PerlinNoise {

    // MARK: Constructor
    // Initialise class with optional graphics object
    constructor(pg) {

        // Save the graphics object in the class
        this.pg = pg;

        if (!this.pg) {
            // If there is no graphics object, create a canvas to display drawing on
            this.myCanvas = createCanvas(window.innerWidth, window.innerHeight);
        }

        // Initialise variables with default parameter values
        this.numberOfParticles = PerlinNoise.getDefaults().NUMBER_OF_PARTICLES;
        this.noiseScale = PerlinNoise.getDefaults().NOISE_SCALE;
        this.speed = PerlinNoise.getDefaults().SPEED;
        this.numberOfColours = PerlinNoise.getDefaults().NUMBER_OF_COLOURS;
        this.colours = [];
        this.isPaused = true;
    }

    // MARK: Functions

    // Function used to hold default parameter values for drawing PerlinNoise
    static getDefaults () {
        return {
            NUMBER_OF_PARTICLES : 800,
            NOISE_SCALE : 800,
            SPEED : 0.4,
            NUMBER_OF_COLOURS : 3,
        };
    }


    // Function used to set up the drawing
    setup () {

        // Set the background for the drawing
        if (this.pg) {

            this.pg.background(21, 8, 50);
        } else {

            background(21, 8, 50);
        }

        // Initialise the array for particles arrays to be held in
        this.particles = [];

        // For each colour that the drawing should have
        for (var i = 0; i < this.numberOfColours; i++) {

            // Create a random colour and store it
            this.colours[i] = [];
            this.colours[i][0] = random(0, 255);
            this.colours[i][1] = random(0, 255);
            this.colours[i][2] = random(0, 255);

            // Initialise index of particles array for this colour
            this.particles[i] = [];

            // Loop through (number of particles / number of colours) times so that approximately equal number of each colour are created
            for (var j = 0; j < this.numberOfParticles / this.numberOfColours; j++) {

                // Create new particle object
                if (this.pg) {

                    this.particles[i][j] = new Particle(random(0, this.pg.width),random(0,this.pg.height), this.pg);
                } else {

                    this.particles[i][j] = new Particle(random(0, width),random(0,height), this.pg);
                }

            }
        }

    }

    // Function used to update the drawing
    draw () {

        // Only update drawing if the drawing isn't paused
        if (!this.isPaused) {

            // Disable drawing the outline and draw geometry with smooth edges
            if (this.pg) {

                this.pg.noStroke();
                this.pg.smooth();
            } else {

                noStroke();
                smooth();
            }

            // Loop through each colour particle and update it
            for (var i = 0; i < this.numberOfColours; i++) {

                // Fill using the current colour
                if (this.pg) {

                    this.pg.fill(this.colours[i][0], this.colours[i][1], this.colours[i][2], alpha);
                } else {

                    fill(this.colours[i][0], this.colours[i][1], this.colours[i][2], alpha);
                }

                // For each particle of this colour
                for (var j = 0; j < this.numberOfParticles / this.numberOfColours; j++) {

                    // Create the radius of particle and its alpha
                    if (this.pg) {

                        var radius = this.pg.map(j, 0, this.numberOfParticles / this.numberOfColours, 1, 2);
                        var alpha = this.pg.map(j, 0, this.numberOfParticles / this.numberOfColours, 0, 250);
                    } else {
                        var radius = map(j, 0, this.numberOfParticles / this.numberOfColours, 1, 2);
                        var alpha = map(j, 0, this.numberOfParticles / this.numberOfColours, 0, 250);
                    }

                    // Move the particle using given noise scale and speed
                    this.particles[i][j].move(this.noiseScale, this.speed);
                    // Show the particle as an elipse
                    this.particles[i][j].display(radius);
                    // Check that the particle hasn't moved off of the drawing, and bring it back on if it has
                    this.particles[i][j].checkEdge();

                }

            }
        }


    }

    // Function to change the status of the drawing from paused to starting
    pauseOrResume () {

        // Reverse the status of isPaused
        this.isPaused = !this.isPaused;
    }

    // Function to clear the current drawing
    reset () {

        if (this.pg) {

            this.pg.clear();
        } else {


            clear();
        }
    }

    // Function to set the ID of the HTML element to show the drawing in
    setParentId (parentId) {

        this.parentId = parentId;
        this.myCanvas.parent(parentId);
    }

    // Function to return the ID of the HTML element the drawing is being shown in
    getParentId () {

        return this.parentId;
    }

    // Function to set the noise scale used in moving the particles
    setNoiseScale (noiseScale) {

        this.noiseScale = noiseScale;
    }

    // Function to get the noise scale used in moving the particles
    getNoiseScale () {

        return this.noiseScale;
    }

    // Function to set the speed of the particles in the drawing
    setSpeed (speed) {

        this.speed = speed;
    }

    // Function to get the speed of the particles in the drawing
    getSpeed () {

        return this.speed
    }

    // Function to set the number of colours, also resets and setups drawing again
    setNumberOfColours (numberOfColours) {

        this.numberOfColours = numberOfColours;
        this.reset();
        this.setup();
    }

    // Function to get the number of colours
    getNumberOfColours () {

        return this.numberOfColours
    }

    // Function to set the number of particles, also resets and setups drawing again
    setNumberOfParticles (numberOfParticles) {

        this.numberOfParticles = numberOfParticles;
        this.reset();
        this.setup();
    }

    // Function to get the number of particles
    getNumberOfParticles () {

        return this.numberOfParticles;
    }
}

// Class used by PerlinNoise class to hold and control particles within the drawing
class Particle {

    // MARK: Constructor
    // Initialise class with x and y position as well as optional graphics parameter
    constructor(x, y, pg) {

        // Create vectors for direction, velocity and position
        this.direction = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.position = createVector(x, y);

        // Set the optional graphics parameter
        this.pg = pg;

    }

    // MARK: Functions

    // Function used to move a particle to a new position
    move (noiseScale, speed) {

        // Calculate angle to move at using position and noiseScale
        var angle = noise(this.position.x / noiseScale, this.position.y / noiseScale) * TWO_PI * noiseScale;
        // Use angle to set x and y elements of direction vector
        this.direction.x = cos(angle);
        this.direction.y = sin(angle);
        // Use direction as base for new velocity
        this.velocity = this.direction.copy();
        // Multiply velocity vector by speed
        this.velocity.mult(speed);
        // Add the velocity vector to the position vector to give the new position
        this.position.add(this.velocity);
    }

    // Function to check and re-adjust particle's position based on whether it has gone off-screen or not
    checkEdge () {

        // If particle's position is not in the range of the screen's, then set it to random one within those bounds
        if (this.pg) {

            if(this.position.x > this.pg.width || this.position.x < 0 || this.position.y > this.pg.height || this.position.y < 0){
                this.position.x = random(50, this.pg.width);
                this.position.y = random(50, this.pg.height);
            }
        } else {

            if(this.position.x > width || this.position.x < 0 || this.position.y > height || this.position.y < 0){
                this.position.x = random(50, width);
                this.position.y = random(50, height);
            }
        }
    }

    // Function to display the particle in its current position with a given radius as an ellipse
    display (r) {
        if (this.pg) {

            this.pg.ellipse(this.position.x, this.position.y, r, r);
        } else {

            ellipse(this.position.x, this.position.y, r, r);
        }
    }
}