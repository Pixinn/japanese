
        var Words = new Array();
        var Idx = 0;
        var Mode = 0;
        const JP = 0;
        const HIRAKATA = 1;
        const FR = 2;

        function addCheckboxes(name)
        {
            let container = $("#config");
            WordLists.forEach( function(list)
            {
                let inputs = container.find('input');
                let id = inputs.length+1;
                container.append("<input type='checkbox' id='cb"+id+"' name="+list+" style='transform:scale(2);'></input><span>&nbsp;&nbsp;&nbsp;&nbsp;"+list+"</span><br/><br/>");
            });              
        }

        function configure()
        {
            if(fetchWords())
            {
                $("#training").show();
                $("#config").hide();
                $("#buttonConfig").hide();
            }
        }


        // Fetch and parse CSV
        function fetchWords()
        {
            let nbLists = 0;
            WordLists.forEach( async function(list)
            {
                if( $('input[name='+list+']').is(':checked') )
                {
                    nbLists++;
                    let response = await fetch("./words/"+list+".csv");
                    response.text().then(
                        function(data){
                            csv = new CSV(data);  
                            csv.forEach(function(record) {
                                Words.push(record);
                            });
                        });   
                }
            });
            return nbLists != 0;
        }

        // ONCLICK
        var Masked = "****************";
        function onNext()
        {
            Mode = $("#mode").get(0).value;
            Idx = Math.floor(Math.random() * Words.length);
            if(Mode === "JP -> FR"){
                let obj = $("#JP").text(Words[Idx][JP]+"\n"+Words[Idx][HIRAKATA]);
                obj.html(obj.html().replace(/\n/g,'<br/>'));
                $("#FR").text(Masked);
            }
            else {
                $("#JP").text(Masked);
                $("#FR").text(Words[Idx][FR]);
            }
            $("BUTTON").text("NEXT");
        }

        function unhide()
        {
            if(Mode === "JP -> FR"){
                $("#FR").text(Words[Idx][FR]);
            }
            else {
                let obj = $("#JP").text(Words[Idx][JP]+"\n"+Words[Idx][HIRAKATA]);
                obj.html(obj.html().replace(/\n/g,'<br/>'));
            }
           
        }

        // START
        $(document).ready(function()
        {
            addCheckboxes();
            fetchWords();
        })
