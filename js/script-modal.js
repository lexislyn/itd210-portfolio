       /*script for modal */
        var modal = document.getElementById("modal");
        var links = document.getElementsByClassName("calendar");
        var closeBtn = document.getElementsByClassName("close")[0];
        var formView = document.getElementById("form-view");
        var submitView = document.getElementById("submit-view")
        
        // When the user clicks on the button, open the modal
        for (var i = 0; i < links.length; i++){
            links[i].addEventListener("click", loadModal);
        }

        function loadModal(e){
            e.preventDefault();
            modal.style.display = "block";
            var day = e.currentTarget.dataset.date;
            document.getElementById("event").textContent = dayEvent[e.currentTarget.dataset.date].title;
            document.getElementById("month").textContent = document.getElementsByTagName("caption")[0].dataset.month;
            document.getElementById("day").innerHTML = ordinalNumber(day);
            document.getElementById("time").textContent = dayEvent[e.currentTarget.dataset.date].time;
            formView.style.display = "block";
            submitView.style.display = "none";
        }

        function ordinalNumber(day){
            switch (day) {
                case "1": return day + "<sup>st</sup>";
                case "2": return day + "<sup>nd</sup>";
                case "3": return day + "<sup>rd</sup>";
                case "21": return day + "<sup>st</sup>";
                case "22": return day + "<sup>nd</sup>";
                case "23": return day + "<sup>rd</sup>"; 
                case "31": return day + "<sup>st</sup>";
                default: return day + "<sup>th</sup>";
            }
        }
        // When the user clicks on <span> (x), close the modal
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        document.querySelector("form.register").addEventListener("submit", function(e) {
            e.preventDefault();
            formView.style.display = "none";
            submitView.style.display = "block";
        });


