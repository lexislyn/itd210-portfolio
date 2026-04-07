// API Section 
/* Used the QuoteSlate API by Musheer360 */
        /* selecting the elements that will be used */
        var quote = document.getElementById("inspirational-quote");
        var btn = document.getElementById("quote-btn");
        
        /*the asynchronous reusable function */
        async function getData() {
            /*try catch block for error handling */
            try {
                /* initial fetch statement to connect to the API */
                const response = await fetch("https://quoteslate.vercel.app/api/quotes/random?tags=inspiration,motivation");
                /* parsing the response into a json file */
                const data = await response.json();
                /* getting rid of the loading ... once we have data from the API */
                quote.textContent = "";
                /* inserting a blockquote element for the quote and a cite element for the author */
                quote.innerHTML = "<blockquote>" + data.quote + "</blockquote><cite>" + "- " +data.author + "</cite>";
            } catch (error) {
                /* writes an error message on the screen for the user */
                quote.textContent = "Sorry, we couldn't load a quote at this time.";
                console.error("Error fetching quote:", error);
            }
        }
        getData();

        /* allows users to click the button to fetch another quote from the API */
        btn.addEventListener("click", getData);