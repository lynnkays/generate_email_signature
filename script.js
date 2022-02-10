/**
 * script.js
 * Handles the background Javascript code for index.html
 * Created by: Kaylynn Diaz-Schott
 * Last Modified: 09/23/2020
 */

/**
 * Takes in the data from the form and stores that data in an object
 */
function handleData() {

    var userInfo = {
        fn: document.getElementById("fullname").value.toUpperCase(),
        ftitle: document.getElementById("ftitle").value,
        cellPhoneNum: document.getElementById("cell").value,
        directLine: document.getElementById("direct").value,
    }

    var multipleTitles = document.getElementsByClassName("fname")
    var otherTitles = [];
    for (i = 0; i < multipleTitles.length; i++) { otherTitles[i] = multipleTitles[i].value; }
    generateSignature(userInfo, otherTitles)

}

/**
 * Generates the HTML signature and displays it in the textbox
 * 
 * @param {object} userInfo The object created from the form data 
 */
function generateSignature(userInfo, otherTitles) {
    var beg = `
    <table style="width:500px;font-size:10pt;font-family:Arial;" cellpadding="0" cellspacing="0"> <tbody style="width:100%;"> 
        <tr><td style="font-size:10pt;line-height:20px;font-family:Arial;width:514px;padding-bottom:10px;vertical-align:top;" valign="top" colspan="2"><b> 
        <span style="font-size:10pt;font-family:Arial;color:#313e49;">${userInfo.fn}</span></b><br> 
        <span style="font-size:10pt;font-family:Arial;color:#313e49;"><i>${userInfo.ftitle}</i></span><br>`

    var titlesString = ""
    if (otherTitles.length != 0) {
        var i;
        var temp = " ";
        for (i = 0; i < otherTitles.length; i++) {
            temp = `${temp}</b><span style="font-size:10pt;font-family:Arial;color:#313e49;"><i>${otherTitles[i]}</i></span></b><br>`
        }
        titlesString = temp;
    }
    var end = `          
            <span style="font-size:10pt;font-family:Arial;color:#313e49;">
            Cell: <a href="tel:${userInfo.cellPhoneNum}" style="text-decoration:none;color:#313e49;">${userInfo.cellPhoneNum}</a>
            <span style="margin-left:15px;">Direct: <a href="tel:${userInfo.directLine}" style="text-decoration:none;color:#313e49;">${userInfo.directLine}</a></span></span>
        </td>
        </tr>
        <tr>
        <td style="width: 80%;display:block;height: 7px;background: #cfd2d3;"></td>
        </tr>
        <tr>
        <td style="vertical-align:top; text-align:left;" valign="top">
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width: 100px; padding-top: 15px; padding-right: 15px;">
                        <a href="https://weigandcommercial.com/" target="_blank" style="text-decoration:none;color:#313e49;"><img src="https://weigandcommercial.com/assets/smaller-logo.png" style="width:100px;"></a>
                    </td>
                    <td style="width: 385px;"> <span style="font-size:10pt;font-family:Arial;color:#313e49;width:77%;line-height:20px;padding-top:15px;">
                    J.P. Weigand & Sons, Inc. Commercial Division
                    <br><a href="https://www.google.com/maps/dir//jp+weigand+and+sons/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x87bae3c213cd7f51:0x431f5462e134153f?sa=X&ved=2ahUKEwjoi6Ps1ITsAhUPQ60KHejJAVUQ9RcwDnoECA4QBA" 
                        target="_blank" style="text-decoration:none;color:#313e49;">150 N Market St, Wichita, KS 67202</a><br><b><a href="https://weigandcommercial.com/"
                        target="_blank" style="text-decoration:none;color:#313e49;">WeigandCommercial.com</a></b>
                </td></tr></table>
        </td></tr>
        <tr><td>&nbsp</td></tr>
        <tr><td><span style="font-size:6pt;font-family:Arial;color:#313e49;width:77%;"> This email is intended for the use of the individual or entity to which it is addressed and may contain information that is privileged, 
        confidential and exempt from disclosure under applicable law. If the reader of this email message is not the intended recipient, you are hereby notified that any dissemination, distribution or copying of this communication is prohibited. If you have received this email in error, please notify us immediately by telephone at 316-262-6400 and also indicate the sender's name. Thank you.</span></td></tr>
        
        </tbody></table></br>
        </html>
    `
    var signature = beg + titlesString + end;
    document.getElementById("html-code").value = signature.replace(/^\s+|\s+$/g, '');
}

/**
 * Handles the download button
 * @param {string} filename The name of the file
 * @param {string} text The HTML code that will be written to the file 
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

/**
 * Initiates the Download 
 */
function startDownload() {
    var text = document.getElementById("html-code").value;
    var filename = "EmailSignature.html";

    download(filename, text);

}

/**
 * Selects and then copies the HTML code to the user's clipboard
 */
function copyCode() {
    var htmlCode = document.getElementById("html-code")
    htmlCode.select();
    document.execCommand("copy")
    alert("Code was copied to your clipboard")

}

/**
 * A function to determine if the pressed key is an integer
 * 
 * @param {*} evt 
 */

function numberPressed(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 36 || charCode > 40)) {
        return false;
    }
    return true;
}

/**
 * A function to format text to look like a phone number
 * @param {*} input 
 */
function phoneFormat(input) {
    // Strip all characters from the input except digits
    input = input.replace(/\D/g, '');

    // Trim the remaining input to ten characters, to preserve phone number format
    input = input.substring(0, 10);

    // Based upon the length of the string, we add formatting as necessary
    var size = input.length;
    if (size == 0) {
        input = input;
    } else if (size < 4) {
        input = input;
    } else if (size < 7) {
        input = input.substring(0, 3) + '-' + input.substring(3, 6);
    } else {
        input = input.substring(0, 3) + '-' + input.substring(3, 6) + '-' + input.substring(6, 10);
    }
    return input;
}