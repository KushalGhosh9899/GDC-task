// Javascript Program for Managing the Tasks

var commands = process.argv; //It will store all the commands(add, help, delete, etc) from the CLI

switch (commands[2]) { //It will check for the commands entered

    case 'help':
        // Help function will be executed
        help();
        break;

    case 'add':
        // Add Task function will be executed
        add_task();
        break;

    case 'ls':
        show_incomplete_tasks();
        break;

    default:
        // If there are no commands matched, the default code block will be executed.
        help();
        break;


}

// This function will print all the available commands with their examples too
function help() {
    var usage_guide = 'Usage :\-\n$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list\n$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order\n$ ./task del INDEX            # Delete the incomplete item with the given index\n$ ./task done INDEX           # Mark the incomplete item with the given index as complete\n$ ./task help                 # Show usage\n$ ./task report               # Statistics'; //Variable contains all the instructions

    console.log(usage_guide); //Prints all the Instructions Guide

}


// This function will add task with priorities
function add_task() {
    var priority_of_task = [];
    var tasks = [];

    //Assigning the values into the variables
    priority_of_task.push(parseInt(commands[3]));
    tasks.push(commands[4]);

    if (isNaN(priority_of_task) == true) {
        //This block is checking for priority of task is entered or not
        console.log("Error: Missing tasks string. Nothing added!");
        return;
    }
    else if (tasks == undefined) {
        //This block is checking for task string is entered or not
        console.log("Error: Missing tasks string. Nothing added!");
        return;
    }

    // Prints the recent added task
    console.log('Added task: "' + tasks + '" with priority ' + priority_of_task);

    //Writing into the task.txt File
    const fs = require('fs'); // appendFile function is defined inside the fs module

    let task_data = priority_of_task + " " + tasks + "\n"; //Variable is defined with task followed by the priority of it

    // It will Write the data in task.txt file
    fs.appendFile(`${__dirname}/task.txt`, task_data, (error) => {
        if (error){            
            console.log(error); // Displays the error
        }
    })

}

// This function lists all the incomplete tasks
function show_incomplete_tasks() {
    //Reading from the task.txt File
    const fs = require('fs');
    
    // Reading data in utf-8 format which is a type of character set
    fs.readFile(`${__dirname}/task.txt`, 'utf-8', (error, task_data) => {
        if (error){            
            console.log(error); // Displays the error
        }

        //Declaring and Initializing the Priority and Task array
        const priority = [];
        const task = [];

        var k = 0; //It stores the position of starting point of current line

        for (i = 0; i <= task_data.length; i++) { //Extracts the Priority and Task

            if (task_data.charCodeAt(i) == 32) { //It checks the space(32 is the ASCII value of spacebar)

                priority.push(task_data.slice(k, i)); //Stores the Priority value of the task
                var j = i;
                while (i <= task_data.length) {

                    if (task_data.charCodeAt(i) == 10) {//It checks the End of line(10 is the ASCII value of \n)
                        task.push(task_data.slice(j + 1, i));//Stores the task into variable
                        k = i + 1; //Changes the position of starting point of current line
                        break;
                    }
                    i++;
                }
            }
        }
        var obj = {}; //Object for sorting the task according to priority

        for (i = 0; i < priority.length; i++) {
            obj[priority[i]]=task[i];//Stores all the value into object i.e., task followed by priority 
        }

        var sno=0;        
        for(const [key, value] of Object.entries(obj)){
            sno++;
            console.log(`${sno}. ${value} [${key}]`);//Prints all the Tasks with priorities
        }

        if(priority.length==0){
            console.log("There are no pending tasks!");
        }
    })
}