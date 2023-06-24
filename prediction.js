document.getElementById("predictionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var sequenceData = document.getElementById("sequenceInput").value.toUpperCase();
    var sequences = sequenceData.split("\n");

    if (sequences.length > 1) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/predict", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                var downloadLink = document.createElement("a");
                downloadLink.href = response.file_url;
                downloadLink.download = "predictions.csv";
                downloadLink.click();
            }
        };
        xhr.send(JSON.stringify({ sequence: sequences }));
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/predict", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                alert(JSON.stringify(response.result, null, 2));
            }
        };
        xhr.send(JSON.stringify({ sequence: [sequences[0]] }));
    }

    document.getElementById("sequenceInput").value = "";
});

function checkInput() {
    var sequenceInput = document.getElementById("sequenceInput");
    var submitBtn = document.getElementById("submitBtn");

    if (sequenceInput.value.trim() !== "") {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}
