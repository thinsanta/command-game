const readline = require('readline');

// Function to simulate the movement of the object
function simulateMovement(commands, width, height, startX, startY) {
    // Initialize object position
    let x = startX;
    let y = startY;
    
    // Initialize object direction (0: North, 1: East, 2: South, 3: West)
    let direction = 0;

    // Process each command
    for (const command of commands) {
        switch (command) {
            case 0:
                // Quit simulation
                return [x, y];
            case 1:
                // Move forward one step
                if (direction === 0 && y > 0) {
                    y--;
                } else if (direction === 1 && x < width - 1) {
                    x++;
                } else if (direction === 2 && y < height - 1) {
                    y++;
                } else if (direction === 3 && x > 0) {
                    x--;
                } else {
                    // Object falls off the table
                    return [-1, -1];
                }
                break;
            case 2:
                // Move backward one step
                if (direction === 0 && y < height - 1) {
                    y++;
                } else if (direction === 1 && x > 0) {
                    x--;
                } else if (direction === 2 && y > 0) {
                    y--;
                } else if (direction === 3 && x < width - 1) {
                    x++;
                } else {
                    // Object falls off the table
                    return [-1, -1];
                }
                break;
            case 3:
                // Rotate clockwise 90 degrees
                direction = (direction + 1) % 4;
                break;
            case 4:
                // Rotate counterclockwise 90 degrees
                direction = (direction + 3) % 4;
                break;
            default:
                // Invalid command
                break;
        }
    }

    // Return final position after processing all commands
    return [x, y];
}

// Function to read input from stdin
function readInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Read table size and object's starting position
    rl.question('Enter table size (width height): ', (tableSize) => {
        const [width, height] = tableSize.split(' ').map(Number);

        rl.question('Enter object\'s starting position (x y): ', (startPosition) => {
            const [startX, startY] = startPosition.split(' ').map(Number);

            // Read commands until 0 is encountered
            const commands = [];
            const readCommands = () => {
                rl.question('Enter command (0 to quit): ', (command) => {
                    commands.push(Number(command));

                    if (Number(command) === 0) {
                        // Quit the simulation and print results
                        const result = simulateMovement(commands.slice(0, -1), width, height, startX, startY);
                        console.log(result);
                        rl.close();
                    } else {
                        // Continue reading commands
                        readCommands();
                    }
                });
            };

            // Start reading commands
            readCommands();
        });
    });
}

// Start reading input
readInput();
