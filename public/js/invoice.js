
$(document).ready(function() {

    // $.get("/api/currentuserid")
    // .then(id=>{
    //     $.get("/api/users/"+id)
    //     .then(user=>{

    //         $("#name").text(user.firstName + " " + user.lastName);
    //         $("#username").text(user.firstName + " " + user.lastName);
    //         $("#email").text(user.email);

    //     });
    //       //ADD ROLE API FIND
    //           });

    function populateUsers() {
        $("#selectLoad").empty();
        // $("#assign-to-user-select").empty();
        $.get("/api/loads")
        .then(load=>{
          console.log(load)
            load.forEach(loads=>{
                $("#selectLoad").append($("<option value='" + loads.id + "'>" + loads.Company + " " + loads.LoadNumber + "</option>"));
                // $("#assign-to-user-select").append($("<option value='" + user.id + "'>" + user.firstName + " " + user.lastName + "</option>"));
            });
            $("#selectLoad").trigger("change");
            // $("#assign-to-user-select").trigger("change");
        });
    };

    populateUsers();







    $("#selectLoad").on("change", event=>{
        $.get("/api/loads/"+$("#selectLoad").val())
        .then(load=>{
          var Company = load.Company;
          var invoiceNum = load.id;
          var Load = load.LoadNumber
          var PickUp =  load.PickUp
          var DropOff = load.Dropoff
          var Weight = load.Weight
          var product = load.product
          // var Pieces =
          // var Total =
          // var Lumper =
          // var Detention =
          var Day = moment().format('ll');
          var Rate = load.Rate;

            $("#Total").val(Rate);
            $('#Company').val(Company);
            $('#invoiceNum').val(invoiceNum);
            $('#Date').val();
            $('#LoadNumber').val(Load);
            $('#PickUp').val(PickUp);
            $('#DropOff').val(DropOff);
            $('#Weight').val(Weight);
            $('#product').val(product);
            // $('#Pieces').val();
            // $('#Total').val();
            // $('#Lumper').val();
            // $('#Detention').val();
        });
    });




  $('#button').click(function() {

     var doc = new jsPDF();

     doc.addImage(imgData, 'JPEG',0,0,210,297);




    var Company = $('#Company').val();
    var invoiceNum = $('#invoiceNum').val();
    var Dateh  = $('#Date').val();
    var Load = $('#LoadNumber').val();
    var PickUp = $('#PickUp').val();
    var DropOff = $('#DropOff').val();
    var Weight = $('#Weight').val();
    var product = $('#product').val();
    var Pieces = $('#Pieces').val();
    var Total = $('#Total').val();
    var Lumper = $('#Lumper').val();
    var Detention = $('#Detention').val();
    var Day = moment().format('ll');
    var Notes = $('#Notes').val();


    doc.setFontSize(11);
    doc.setTextColor(92, 76, 76);
    doc.text(38, 65, invoiceNum);
    doc.text(29,69.5, Day);
    doc.text(18, 75, Load);



    doc.setFontSize(26);
    doc.setTextColor(92, 76, 76);
    doc.text(107, 65, Company);
    // doc.text(114, 45, Load);



    doc.setFontSize(12);
    doc.text(107,102, PickUp);
    doc.text(107,118, DropOff);
    doc.text(107,133, Weight);
    doc.text(107,149, product);
    doc.text(107,165, Pieces);
    doc.text(20, 255, Notes)



    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(157, 205, Total);

     doc.save('invoice'+'Load'+'.pdf');





      });
 });