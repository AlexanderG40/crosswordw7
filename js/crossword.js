// Array of clues
var arrWords = ["Chief", "Mahomes", "LasVegas"];
// Set up a nickname/short cut/pointer to the table in the HTML
var table = document.getElementById("tblPuzzle");

// This function will build the table which will be the foundation for the crossword puzzle
function buildTable(table){
    
    // Lets build the table rows and columns with a for loop
    for(var i=0; i < 10; i++){
        // create a new row everytime this runs, so we end up with 10 rows
        var row =  document.createElement("tr");

        // nested for loop to create the columns
        for (var j = 0; j < 8; j++){
            // Create a column and then add it to the row
            var col = document.createElement("td");
            // Add our brand new column to the row we created in the outer for loop
            row.appendChild(col);
        }
        // Add the row with all the columns to the table
        table.appendChild(row);
    }
}
// This function will add our clues to the table
function buildClues(wordIndex, direction, startingRow, startingCol, table, showAnswer){
    // For loop to go through the letters and add them to the table
    for (var i=0; i < arrWords[wordIndex].length; i++){
        var tr;
        var td;
        var rowIndex = 0;
        var colIndex = 0;

        // If the word goes across, it will stay in the same row, and will move over one column each time the loop runs
        if (direction == "across"){
            rowIndex = startingRow;
            colIndex = startingCol + i;
        }
        // If the word goes across, it will stay in the same row, and will move down one row each time the loop runs
        else if (direction == "down"){
            rowIndex = startingRow + i;
            colIndex = startingCol;
        }
        // Catch all - invalid input
        else{
            console.log("Wrong, try again!");
        }
        // Get the relevant row from the table
        tr = table.rows[rowIndex]
        // Get the relevant column from the table
        td = tr.cells[colIndex];

        // if no children have been added to the table data cell then add a input box
        // this prevents multiple input boxes from being added to the same cell
        if (td.childElementCount == 0){
            // set up a text box that allows for 1 letter
            var input = document.createElement("input");
            input.setAttribute("maxLength", "1");
            if (showAnswer){
                // Add the letter to the textbox
                input.value = arrWords[wordIndex][i].toUpperCase();
            }
            
            // add the text box to the table cell
            td.appendChild(input);

        }
        else if (showAnswer){
            // If the textbox already exists find and add a letter to it
            var existingInput = td.getElementsByTagName("input")[0];
            existingInput.value = arrWords[wordIndex][i].toUpperCase();
        }

    }

}
// this function will call build clues for each clue and show the answer in the text box
function revealAnswers(){
    buildClues(0, "across", 2, 0, table, true);
    buildClues(1, "down", 0, 1, table, true);
    buildClues(2, "down", 0, 5, table, true);
}

buildTable(table);
// Call the build clues function to add first word to the 2nd row of the table
buildClues(0, "across", 2, 0, table, false);
buildClues(1, "down", 0, 1, table, false);
buildClues(2, "down", 0, 5, table, false);
