// Hi. I'm randy. It's my job to produce random stuff for you.

function randy(x, y){

    if ( Number.isFinite(x) ){
        return Math.floor( Math.random()*x );
    } else
    // If you give me an array, I'll pick one for you.
    if (Array.isArray(x)){
        return x[ randy(x.length) ];
    } else
    if (x == "name"){
        // Meet the residents
        var first = [
            "Fred",
            "Billy",
            "Sally",
            "Joey",
            "Annis",
            "Willia",
            "Enis",
            "Band",
            "Sam",
            "SAAAAM",
            "Bip",
            "Bop",
            "Jane",
            "Minney",
            "Manney",
            "Mono",
            "Mercury",
            "Will",
            "Phil",
            "Philo",
            "Menos",
            "Rankin",
            "Kalvin",
            "Kale",
            "McJack",
            "Qi",
            "Ji",
            "Lohan",
            "Hazel",
            "Girly",
            "Bear",
            "Monica",
            "Dhalia",
            "Ananda",
            "Willow", 
            "Deer", 
            "Angora", 
            "Bilderberger", 
            "Rothschild",
            "Anaconda",
            "Someone Else's Friend",
            "Not From Around Here",
            "Senator",
            "Congressman",
            "Donald ",
            "Meyers ",
            "Derek ",
            "Merfolk ",
            "Mayor",
            "Representative"
        ];
        var middle = [
            "","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",
            '"The Salty" ',
            '"Unafraid" ',
            "Uninvited ",
            "The Ramblin\' ",
            'Boabanna ',
            'The Dirty Eyed ',
            "Hurt But Not Mortally Wounded ",
            'From Down Under ',
            "Gon ",
            "Ancestorius ",
            "Illin ",
            "Not Very Smart ",
            "Brilliant ",
            "Einstein ",
            "Presley ",
            "Parrrsley ",
            "Jack ",
            "McJackie ",
            "Chan ",
            "EyeGore ",
            "The Pirate ",
            "Menos ",
            "Mas ",
            "Max ",
            "The Illuminati ",
            "Mc ",
            "Eli ",
            "Antonio ",
            "Luigi ",
            "Juan ",
            "Wan ",
            "PhD ",
            "Prof. ",
            "Mc",
            "De",
            "Anti-",
            "The",
            "Andy ",
            "Super",
            "Bat-",
            "A",
            "H",
            "III ",
            "IV ",
            "IX ",
            "Regarded ",
            "II ",
            "The Janitor ",
            "Daddy ",
            "Momma ",
            "von",
            "Van",
            "Hoff", 
            "Hoss", 
            "Avocado ",
            "Battery ",
            "The Lawyer ",
            "Ex Con ",
            "Schoolteacher ",
            "Blue ",
            "Seven ",
            "Sixteen ",
            "Not Sure ",
            "Milkweed ",
            "Nettlestem ",
            "Rhubarb ",
            "Anderson ",
            "Waldo ",
            "Waldorf ",
            "Hitler ",
            "Trudeau ",
            "Trump ",
            "Python ",
            "Frederic "
            
        ];
        var last = [ "","","","","","","","","",
            "Samuelson",
            "Anton",
            "Gremlin",
            "The Last Boss",
            "Not That Important",
            "Amadala",
            "Of Ire",
            "Witgenstein",
            "The Deceiver",
            "Jack",
            "From Far Off Lands",
            "Also Drenched In Sweat",
            "Steve",
            "The Evil Philanthropist",
            "McSenatorr",
            "Anthony",
            "Chi",
            "Pantheon",
            "Mills And Sons",
            "Lie Gold",
            "The Kid",
            "Crusoe",
            "Kid",
            "Emmerson",
            "Jin",
            "Bilbo",
            "Balboa",
            "Billybongo",
            "Arnolds",
            "Complicated",
            "Of All Time",
            "Jinn",
            "Gin",
            "Gini",
            "Gean",
            "Wanton",
            "Yam",
            "CucumberPatch",
            "Picked",
            "Shirtlogger",
            "Anklegrinder",
            "Max",
            "Vader",
            "Kenobi",
            "Jin",
            "Paraphenalia",
            "Mac",
            "Of The North",
            "Of The South",
            "Of The East",
            "Of The West",
            "Killgore",
            "Idea"
        ];
        return (y || first[ randy(first.length) ] )+ " " + // Hi, this is randy. Is randy there?
               middle[ randy(middle.length) ] +
               last[ randy(last.length) ]
    }

}