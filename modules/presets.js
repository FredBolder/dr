class Presets {
    static textToValue(s) {
      let result = "";
      for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (c === " ") {
            c = "";
        }
        result += c;
      }
      return result;
    }

    static fillRhythmSelect() {
        let options = [];
        const category = document.getElementById("categorySelector").value;
        switch (category) {
            case "PopRock":
                options = ["Disco 1", "Disco 2", "Metal 1", "Metal 2", "Rock 1", "Rock 2", "Rock 3", "Rock ballad 1"];
                break;
            case "BallroomLatin":
                options = ["Cha Cha Cha 1", "Jive 1", "Merengue 1", "Paso doble 1", "Paso doble 2", "Quickstep 1", "Rumba 1", "Samba 1",
                    "Samba 2", "Slow waltz 1", "Slowfox 1", "Tango 1", "Tango 2", "Tango 3", "Viennese waltz 1", "Zouk 1"
                ];
                break;
            case "Greek":
                options = ["Aptaliko 1", "Berati 1", "Dipat 1", "Hasapiko1", "Hasaposerviko 1", "Kalamatianos 1", "Kalamatianos 2", "Kalamatianos 3",  
                    "Kamilierikos 1", "Kamilierikos 2", "Karsilamas 1", "Karsilamas 2", "Palio Zeibekiko 1", "Pogonisios 1", "Roumba 1", "Syrtos 1", 
                    "Tik 1", "Tik tromachton 1", "Tik tromachton 2","Tsakonikos 1", "Tsakonikos 2", "Tsamikos 1", "Tsifteteli 1",   
                    "Tsifteteli 2", "Zeibekiko 1", "Zeibekiko 2","Random Zeibekiko", "Zonaradiko 1", "Zonaradiko 2"
                ];
                break;
            default:
                break;
        }
        let rhythmSelector = document.getElementById("rhythmSelector");
        rhythmSelector.innerHTML = ""; // Remove all options
        for (let i = 0; i < options.length; i++) {
            let option = document.createElement("option");
            option.textContent = options[i];
            option.value = this.textToValue(options[i]);
            rhythmSelector.appendChild(option);
        }
        rhythmSelector.selectedIndex = 0;
    }
}

export { Presets };