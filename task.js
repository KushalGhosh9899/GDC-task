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
        //This function will display all the pending tasks
        show_incomplete_tasks();
        break;

    case 'del':
        //Delete Task function will be executed
        delete_task();
        break;

    case 'done':
        //This function will Mark task as complete
        mark_as_complete();
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
        if (error) {
            console.log(error); // Displays the error
        }
    })

}

// This function lists all the incomplete tasks
function show_incomplete_tasks() {
    //Reading from the task.txt File
    const fs = require('fs');

    var task_file = `${__dirname}/task.txt`;//Path of the file

    if (fs.existsSync(task_file)) { //Checks that file exists or not      
        // Reading data in utf-8 format which is a type of character set 
        fs.readFile(task_file, 'utf-8', (error, task_data) => {
            if (error) {
                console.log(error); // Displays the error
            }

            if (task_data.length == 0) {
                console.log("There are no pending tasks!");
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

                        if (task_data.charCodeAt(i) == 10) { //It checks the End of line(10 is the ASCII value of \n)
                            task.push(task_data.slice(j + 1, i)); //Stores the task into variable
                            k = i + 1; //Changes the position of starting point of current line
                            break;
                        }
                        i++;
                    }
                }
            }
            var obj = {}; //Object for sorting the task according to priority

            for (i = 0; i < priority.length; i++) {
                obj[priority[i]] = task[i]; //Stores all the value into object i.e., task followed by priority 
            }

            var sno = 0;
            for (const [key, value] of Object.entries(obj)) {
                sno++;
                console.log(`${sno}. ${value} [${key}]`);
            }
        });
    }
    else {
        console.log("There are no pending tasks!");
    }
}

// This function Delete the task according to the given priority number
function delete_task() {
    if (!commands[3]) {//Checks for priority task is passed or not
        console.log("Error: Missing NUMBER for deleting tasks.");
        return;
    }
    //Reading from the task.txt File
    const fs = require('fs');

    // Reading data in utf-8 format which is a type of character set
    var task_file = `${__dirname}/task.txt`;//Path of the file

    if (fs.existsSync(task_file)) {//Checks that file exists or not

        fs.readFile(task_file, 'utf-8', (error, task_data) => {
            if (error) {
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
                obj[priority[i]] = task[i];//Stores all the value into object i.e., task followed by priority 
            }

            task_priority = commands[3];//Stores the priority number of the task to be deleted 

            for (const [key, value] of Object.entries(obj)) {
                console.log("Deleted task #" + task_priority);

                if (key == task_priority) {
                    delete obj[task_priority];//Deletes the task according to the given priority

                    //Removes all the previous data
                    fs.writeFile(task_file, '', (error) => {
                        if (error) {
                            console.log(error); // Displays the error
                        }
                    })

                    // Writes all the Tasks with priorities
                    for (const [key, value] of Object.entries(obj)) {
                        var task_data = `${key} ${value}\n`;

                        fs.appendFile(task_file, task_data, (error) => {
                            if (error) {
                                console.log(error); // Displays the error
                            }
                        })
                    }
                    break;
                }
            }
                console.log("Error: task with index #" + task_priority + " does not exist. Nothing deleted.");

        })
    }
    else {
        console.log("There are no pending tasks!");
    }
}

// This function mark as complete the task according to the given priority number
function mark_as_complete() {

    if (!commands[3]) {//Checks for priority task is passed or not
        console.log("Error: Missing NUMBER for marking tasks as done.");
        return;
    }
    //Reading from the task.txt File
    const fs = require('fs');

    // Reading data in utf-8 format which is a type of character set
    var task_file = `${__dirname}/task.txt`;//Path of the file

    if (fs.existsSync(task_file)) {//Checks that file exists or not

        fs.readFile(task_file, 'utf-8', (error, task_data) => {
            if (error) {
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
                obj[priority[i]] = task[i];//Stores all the value into object i.e., task followed by priority 
            }

            task_priority = commands[3];//Stores the priority number of the task to be deleted

            for (const [key, value] of Object.entries(obj)) {//Checks for Priority exists or not
                if (key != task_priority) {
                    console.log("Error: no incomplete item with index #" + commands[3] + " exists.");
                    break;
                }
            }

            for (const [key, value] of Object.entries(obj)) {
                console.log("Marked item as done.");

                if (key == task_priority) {
                    //Moving the completed task from task.txt to complete.txt file
                    //Removes all the previous data into complete.txt file
                    fs.writeFile(`${__dirname}/complete.txt`, '', (error) => {
                        if (error) {
                            console.log(error); // Displays the error
                        }
                    })

                    // Writes all the Tasks with priorities in complete.txt file
                    var task_data = `${value}\n`;
                    console.log(task_data);
                    fs.appendFile(`${__dirname}/complete.txt`, task_data, (error) => {
                        if (error) {
                            console.log(error); // Displays the error
                        }
                    })

                }

                // delete obj[task_priority];//Deletes the task according to the given priority because it is completed now

                //Removes all the previous data into task.txt
                fs.writeFile(task_file, '', (error) => {
                    if (error) {
                        console.log(error); // Displays the error
                    }
                })

                // Writes all the Tasks with priorities into task.txt
                for (const [key, value] of Object.entries(obj)) {
                    var task_data = `${key} ${value}\n`;

                    fs.appendFile(task_file, task_data, (error) => {
                        if (error) {
                            console.log(error); // Displays the error
                        }
                    })
                }
                return;
            }

        })
    }
    else {
        console.log("There are no pending tasks!");
    }

}