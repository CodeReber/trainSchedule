// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new Trains - then update the html + update the database
// 3. Create a way to retrieve Trains from the Train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC4WKxdQDsLBkQ6ecXeHvEYuzwKKcCn_Yg",
    authDomain: "trainapp-5def5.firebaseapp.com",
    databaseURL: "https://trainapp-5def5.firebaseio.com",
    projectId: "trainapp-5def5",
    storageBucket: "trainapp-5def5.appspot.com",
    messagingSenderId: "373001738830"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var TrainName = $("#train-name-input").val().trim();
    var Destination = $("#destination-input").val().trim();
    var TrainTime = $("#first-train-time").val().trim();
    var Freq = $("#Frequency").val().trim();
  
    // Creates local "temporary" object for holding Train data
    var newTrain = {
      Train_Name: TrainName,
      Des: Destination,
      TTime: TrainTime,
      Freq_1: Freq
    };
  
    // Uploads Train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time").val("");
    $("#Frequency").val("");
  });
  
  // 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var fireTrainName = childSnapshot.val().Train_Name;
    var fireDestination = childSnapshot.val().Des;
    var fireFTTime = childSnapshot.val().TTime;
    var fireFreq = childSnapshot.val().Freq_1;
  
    // Train Info
    console.log(fireTrainName);
  

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(fireFTTime, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment().format("hh:mm");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % fireFreq;

    // Minute Until Train
    var tMinutesTillTrain = fireFreq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    




    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(fireTrainName),
      $("<td>").text(fireDestination),
      $("<td>").text(fireFreq),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Train start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  