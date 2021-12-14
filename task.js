// Javascript Program for Managing the Tasks

var commands = process.argv ; //It will store all the commands(add, help, delete, etc) from the CLI

switch(commands[2]){ //It will check for the commands entered

    case 'help' :
        // Help function will be executed
        help();
        break;

    case 'add':
        // Add Task function will be executed
        add_task();
        break;

    default :
        // If there are no commands matched, the default code block will be executed.
        help();
        break;


}

// This function will print all the available commands with their examples too
function help(){
    var usage_guide = 'Usage :\-\n$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list\n$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order\n$ ./task del INDEX            # Delete the incomplete item with the given index\n$ ./task done INDEX           # Mark the incomplete item with the given index as complete\n$ ./task help                 # Show usage\n$ ./task report               # Statistics'; //Variable contains all the instructions
    
    console.log(usage_guide); //Prints all the Instructions Guide
    
}


// This function will add task with priorities
function add_task(){
    var priority_of_task=[];
    var tasks=[];

    //Assigning the values into the variables
    priority_of_task.push(parseInt(commands[3]));
    tasks.push(commands[4]);
    
    if(isNaN(priority_of_task) == true){
        //This block is checking for priority of task is entered or not
        console.log("Error: Missing tasks string. Nothing added!");
        return;
    }
    else if(tasks == undefined){
        //This block is checking for task string is entered or not
        console.log("Error: Missing tasks string. Nothing added!");
        return;
    }

    // Prints the recent added task
    console.log('Added task: "'+tasks+'" with priority '+priority_of_task);

    //Writing into the task.txt File
    const fs = require('fs'); // appendFile function is defined inside the fs module

    let task_data = priority_of_task+" "+tasks+"\n"; //Variable is defined with task followed by the priority of it

    // It will Write the data in task.txt file
    fs.appendFile(`${__dirname}/task.txt`, task_data, (error) => {       
    if (error)         
        throw error; // In case of an error thrown
    })

}