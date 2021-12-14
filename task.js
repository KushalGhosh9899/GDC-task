// Javascript Program for Managing the Tasks

var commands = process.argv ; //It will store all the commands(add, help, delete, etc) from the CLI

switch(commands[2]){

    case 'help' :
        // Help function will be executed
        help();
        break;

    default :
        // If there are no commands matched, the default code block will be executed.
        help();
        break;


}

// This function will print all the available commands with their examples too
function help(){
    var usage_guide = 'Usage :\- \n$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list\n$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order\n$ ./task del INDEX            # Delete the incomplete item with the given index\n$ ./task done INDEX           # Mark the incomplete item with the given index as complete\n$ ./task help                 # Show usage\n$ ./task report               # Statistics'; //All the instructions are stored in this variable
    
    console.log(usage_guide); //Prints all the Instruction Guide
}

