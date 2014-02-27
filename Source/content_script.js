
var handleLeftParen = function() {
    //Easy reference
    var input = document.activeElement;

    //Get some indexes and the content.
    var startIndex = input.selectionStart;
    var content    = input.value;
  
    //If there's a left paren immediately to the right, we won't insert a right.
    if (content && content.charAt(startIndex) == "(")
        return false;

    //Add in the right paren.
    var replace    = content.substring(0, startIndex) + ")" + content.substring(startIndex);
    input.value    = replace;
    
    //Move cursor back so it goes in the right place.
    input.setSelectionRange(startIndex, startIndex);  
}

var handleDelete = function() {
    var input = document.activeElement;
    var startIndex = input.selectionStart;
    var content = input.value;

    //If we have (), we want to delete the right one.
    if (content && content.charAt(startIndex - 1) == "(" 
                && content.charAt(startIndex)     == ")") {
        var replace = content.substring(0, startIndex) + content.substring(startIndex+1)
        input.value = replace;
        input.setSelectionRange(startIndex, startIndex)
    }
}

var handleRightParen = function(event) {
    var input = document.activeElement;
    var startIndex = input.selectionStart;
    var content = input.value;

    //Skip over a right paren if we try to insert one when we are to the left of one.
    if (content && content.charAt(startIndex) == ")") {
        event.preventDefault();
        input.setSelectionRange(startIndex + 1, startIndex + 1)
    }

}

var parenHandler = function(e) { 
    if (e.shiftKey && e.keyCode == 57 ) {
        handleLeftParen();
    }

    else if (e.shiftKey && e.keyCode == 48) {
        handleRightParen(e);
    }

    else if (e.keyCode == 8) {
        handleDelete();
    }
}

document.activeElement.addEventListener ("keydown", parenHandler);

