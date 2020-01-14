
function initialApiRoute () {
    axios.get("https://www.nytimes.com/").then(function(response) {
    
        const $ = cheerio.load(response.data);
    
        $("article").each(function(i, element) {
        
          var result = [];
          
          result.headline = $(element).find("h2").text().trim();
          result.url = 'https://www.nytimes.com' + $(element).find("a").attr("href");
          result.summary = $(element).find("p").text().trim();
    
          console.log(result)});
    
      })}