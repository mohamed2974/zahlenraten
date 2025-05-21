//* generiert eine Zufallszahl je nach Schwierigkeit

function random_num(schwierigkeit) {
    let nummer 
    if (schwierigkeit == "easy") {
        nummer = Math.floor(Math.random()* 100) ;
    }

    if (schwierigkeit == "medium") {
        nummer = Math.floor(Math.random()* 1000) ;
    }	

    if (schwierigkeit == "hard") {
        nummer = Math.floor(Math.random()* 10000) ;
    }

    if (schwierigkeit == "impossible") {
        nummer = Math.floor(Math.random()* 10000000) ;
    }

    return nummer;
}

export {random_num}