let is_it_white_turn = true;

function add_pieces(){
    for(let i = 1; i<24 ; i+=2){
        if(i == 9)
            i++;
        if(i==18)
            i--; 
        document.getElementById("cell" + i).innerHTML = '<span class="black_piece"></span>';
        document.getElementById("cell" + i).classList.add("contain_black_piece");
    }
    for(let i = 42; i<65 ; i+=2){
        if(i == 50)
            i--;
        if(i==57)
            i++; 
        document.getElementById("cell" + i).innerHTML = '<span class="white_piece"></span>';
        document.getElementById("cell" + i).classList.add("contain_white_piece");
    }
}
function color_board(){
    for(let i = 1; i<=64 ; i++){
        if((i<=8 && i%2 == 1)||(i>8 && i<=16 && i%2 != 1)||(i>16 && i<=24 && i%2 == 1)||(i>24 && i<=32 && i%2 != 1)||(i>32 && i<=40 && i%2 == 1)||(i>40 && i<=48 && i%2 != 1)||(i>48 && i<=56 && i%2 == 1)||(i>56 && i%2 != 1))
            document.getElementById("cell" + i).style.backgroundColor = "#ffc529";
    }
}
function start_turn(cell_clicked){
    const element = document.getElementById("cell" + cell_clicked);
    let classes_to_string = element.className;
    let is_eat_right_now = false;
    if(classes_to_string.includes("contain")){
        for(let i = 1; i<65 ; i++){
            const element2 = document.getElementById("cell" + i);
            let classes_to_string2 = element2.className;
            if(classes_to_string2.includes("move_now"))
                document.querySelector('#cell' + i).classList.remove("move_now");
            if(classes_to_string2.includes("may_cont_white_piece"))
                document.querySelector('#cell' + i).classList.remove("may_cont_white_piece");
            if(classes_to_string2.includes("may_cont_black_piece"))
                document.querySelector('#cell' + i).classList.remove("may_cont_black_piece");
            if(classes_to_string2.includes("may_cont_black_king"))
                document.querySelector('#cell' + i).classList.remove("may_cont_black_king");
            if(classes_to_string2.includes("may_cont_white_king"))
                document.querySelector('#cell' + i).classList.remove("may_cont_white_king");
            color_board()
        }
        let there_is_piece_can_eat = false;
        for(let i = 1; i<65 ; i++){
            if(can_i_eat("cell"+i, is_it_white_turn, false)){
                there_is_piece_can_eat = true;
                break;
            }
        }
        if(!there_is_piece_can_eat){
            show_legal_move("cell" + cell_clicked,is_it_white_turn,true)
            document.getElementById("cell" + cell_clicked).style.backgroundColor = "#967417";
            document.getElementById("cell" + cell_clicked).classList.add("move_now")
        }
        else{
            if(can_i_eat("cell"+cell_clicked, is_it_white_turn , true)){
                document.getElementById("cell" + cell_clicked).style.backgroundColor = "#967417";
                document.getElementById("cell" + cell_clicked).classList.add("move_now");
            }
        }   
    }
    else if(classes_to_string.includes("may_cont") || classes_to_string.includes("may_eat_and_cont")){
        if(classes_to_string.includes("may_eat_and_cont")){
            eat_enemy(cell_clicked,is_it_white_turn);
            is_eat_right_now = true;
        }
        move_piece("cell" + cell_clicked);
        claer_every_empty_cells();
        if(is_eat_right_now && can_i_eat("cell"+cell_clicked, is_it_white_turn , false)){
        }
        else{
            replace_simple_pieces_to_kings();
            is_it_white_turn = !is_it_white_turn; 
            if(is_win_situation(is_it_white_turn)){
                alert("win!!");
                location.reload();
            }
        }
    }
}
function is_win_situation(is_it_white_turn){
    console.log(is_it_white_turn);
    for(let i = 1; i<65;i++)
        if(document.getElementById("cell" + i).className.includes("contain_"+ (is_it_white_turn?"white":"black")))
            if(can_i_eat("cell"+i,is_it_white_turn,false) || show_legal_move("cell"+i,is_it_white_turn,false))
                return false;
    return true;
}
function replace_simple_pieces_to_kings(){
    for(let i = 1 ; i < 9 ; i++){
        let classes_to_string =  document.getElementById("cell" + i).className;
        if(classes_to_string.includes("contain_white_piece")){
            document.querySelector("#cell" + i + ' > span').remove();
            document.getElementById("cell" + i).classList.remove("contain_white_piece");
            document.getElementById("cell" + i).classList.add("contain_white_king");
            document.getElementById("cell" + i).innerHTML = '<span class="white_king"></span>';
        }
    }
    for(let i = 57 ; i < 65 ; i++){
        let classes_to_string =  document.getElementById("cell" + i).className;
        if(classes_to_string.includes("contain_black_piece")){
            document.querySelector("#cell" + i + ' > span').remove();
            document.getElementById("cell" + i).classList.remove("contain_black_piece");
            document.getElementById("cell" + i).classList.add("contain_black_king");
            document.getElementById("cell" + i).innerHTML = '<span class="black_king"></span>';
        }
    }
}
function eat_enemy(cell_clicked, is_it_white_turn){
    const element = document.getElementById("cell" + cell_clicked);
    let classes_to_string = element.className;
    if(classes_to_string.includes("_piece4") || classes_to_string.includes("_king4")){
        document.querySelector("#cell"+ cell_clicked).classList.remove("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_piece4");
        document.querySelector(".row" +(parseInt(classes_to_string[3])-1)+ ".column"+(parseInt(classes_to_string[11])-1)+ ' > span').remove();
        document.querySelector(".row" +(parseInt(classes_to_string[3])-1)+ ".column"+(parseInt(classes_to_string[11])-1)).classList.remove("contain_"+(is_it_white_turn ? "black" : "white")+"_piece");
        document.querySelector(".row" +(parseInt(classes_to_string[3])-1)+ ".column"+(parseInt(classes_to_string[11])-1)).classList.remove("contain_"+(is_it_white_turn ? "black" : "white")+"_king");
    }else if(classes_to_string.includes("_piece3") || classes_to_string.includes("_king3")){
        document.querySelector("#cell"+ cell_clicked).classList.remove("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_piece3");
        document.querySelector(".row" +(parseInt(classes_to_string[3])-1)+ ".column"+(parseInt(classes_to_string[11])+1)+ ' > span').remove();
        document.querySelector(".row" +(parseInt(classes_to_string[3])-1)+ ".column"+(parseInt(classes_to_string[11])+1)).classList.remove("contain_"+(is_it_white_turn ? "black" : "white")+"_piece");
        document.querySelector(".row" +(parseInt(classes_to_string[3])-1)+ ".column"+(parseInt(classes_to_string[11])+1)).classList.remove("contain_"+(is_it_white_turn ? "black" : "white")+"_king");
    }else if(classes_to_string.includes("_piece2") || classes_to_string.includes("_king2")){
        document.querySelector("#cell"+ cell_clicked).classList.remove("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_piece2");
        document.querySelector(".row" +(parseInt(classes_to_string[3])+1)+ ".column"+(parseInt(classes_to_string[11])-1)+ ' > span').remove();
        document.querySelector(".row" +(parseInt(classes_to_string[3])+1)+ ".column"+(parseInt(classes_to_string[11])-1)).classList.remove("contain_"+(is_it_white_turn ? "black" : "white")+"_piece");
        document.querySelector(".row" +(parseInt(classes_to_string[3])+1)+ ".column"+(parseInt(classes_to_string[11])-1)).classList.remove("contain_"+(is_it_white_turn ? "black" : "white")+"_king");
    }else if(classes_to_string.includes("_piece1") || classes_to_string.includes("_king1")){
        document.querySelector("#cell"+ cell_clicked).classList.remove("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_piece1");
        document.querySelector(".row" +(parseInt(classes_to_string[3])+1)+ ".column"+(parseInt(classes_to_string[11])+1)+ ' > span').remove();
        document.querySelector(".row" +(parseInt(classes_to_string[3])+1)+ ".column"+(parseInt(classes_to_string[11])+1)).classList.remove("contain_"+(is_it_white_turn ? "black" : "white")+"_piece");
        document.querySelector(".row" +(parseInt(classes_to_string[3])+1)+ ".column"+(parseInt(classes_to_string[11])+1)).classList.remove("contain_"+(is_it_white_turn ? "black" : "white")+"_king");
    }
}
function claer_every_empty_cells(){
    for(let i = 1; i<65 ; i++){
        //console.log(i);
        const element = document.getElementById("cell"+i);
        let classes_to_string = element.className;
        if(classes_to_string.includes("may_cont") || classes_to_string.includes("move_now") || classes_to_string.includes("may_eat")){
            reset_cell('cell' + i )
        }
    }
    color_board()
}
function show_legal_move(id_cell_from, is_it_white_turn, mark_legal_move){
    let there_is_legal_move = false;
    color_board()
    const element = document.getElementById(id_cell_from);
    let classes_to_string = element.className;
    if(classes_to_string.includes("king")){
        if(((classes_to_string.includes("white")&&is_it_white_turn) || (classes_to_string.includes("black")&&!is_it_white_turn))){
            let continue_looking_up_left = true;
            let continue_looking_up_right = true;
            let continue_looking_down_left = true;
            let continue_looking_down_right = true;
            for(let i =1;i<8;i++){
                if((continue_looking_up_left) && (classes_to_string[3]-i <1 || classes_to_string[11]-i <1||(classes_to_string[3]-i > 0 && classes_to_string[11]-i >0 &&
                    document.querySelector('.row'+(classes_to_string[3]-i)+'.column'+(classes_to_string[11]-i)).className.includes("contain")))){
                    continue_looking_up_left = false;
                    }
                if((continue_looking_up_right)&& (classes_to_string[3]-i <1 || parseInt(classes_to_string[11])+i>8||(classes_to_string[3]-i >0 && parseInt(classes_to_string[11])+i<9&&
                    document.querySelector('.row'+(classes_to_string[3]-i)+'.column'+(parseInt(classes_to_string[11])+i)).className.includes("contain")))){
                    continue_looking_up_right = false;
                    }
                if((continue_looking_down_left) && ((parseInt(classes_to_string[3])+i>8) || classes_to_string[11]-i <1||(parseInt(classes_to_string[3])+i<9 && classes_to_string[11]-i >0&&
                    document.querySelector('.row'+(parseInt(classes_to_string[3])+i)+'.column'+(classes_to_string[11]-i)).className.includes("contain")))){
                    continue_looking_down_left = false;
                    }
                if((continue_looking_down_right)&& ((parseInt(classes_to_string[3])+i>8) || (parseInt(classes_to_string[11])+i>8)||(parseInt(classes_to_string[3])+i<9 && (parseInt(classes_to_string[11])+i<9)&&
                    document.querySelector('.row'+(parseInt(classes_to_string[3])+i)+'.column'+(parseInt(classes_to_string[11])+i)).className.includes("contain")))){
                    continue_looking_down_right = false;
                    }
                if(continue_looking_up_left &&
                    !document.querySelector('.row'+(classes_to_string[3]-i)+'.column'+(classes_to_string[11]-i)).className.includes("contain")){
                    there_is_legal_move = true;
                    if(mark_legal_move){
                        document.querySelector('.row'+(classes_to_string[3]-i)+'.column'+(classes_to_string[11]-i)).style.backgroundColor = "#87bdff";
                        document.querySelector('.row'+(classes_to_string[3]-i)+'.column'+(classes_to_string[11]-i)).classList.add("may_cont_"+ (is_it_white_turn ? "white" : "black") +"_king");
                    }
                }
                if(continue_looking_up_right &&
                    !document.querySelector('.row'+(classes_to_string[3]-i)+'.column'+(parseInt(classes_to_string[11])+i)).className.includes("contain")){
                    there_is_legal_move = true;
                    if(mark_legal_move){
                        document.querySelector('.row'+(classes_to_string[3]-i)+'.column'+(parseInt(classes_to_string[11])+i)).style.backgroundColor = "#87bdff";
                        document.querySelector('.row'+(classes_to_string[3]-i)+'.column'+(parseInt(classes_to_string[11])+i)).classList.add("may_cont_"+ (is_it_white_turn ? "white" : "black") +"_king");
                    }
                }
                if(continue_looking_down_left &&
                    !document.querySelector('.row'+(parseInt(classes_to_string[3])+i)+'.column'+(classes_to_string[11]-i)).className.includes("contain")){
                    there_is_legal_move = true;
                    if(mark_legal_move){
                        document.querySelector('.row'+(parseInt(classes_to_string[3])+i)+'.column'+(classes_to_string[11]-i)).style.backgroundColor = "#87bdff";
                        document.querySelector('.row'+(parseInt(classes_to_string[3])+i)+'.column'+(classes_to_string[11]-i)).classList.add("may_cont_"+ (is_it_white_turn ? "white" : "black") +"_king");
                    }
                }
                if(continue_looking_down_right &&
                    !document.querySelector('.row'+(parseInt(classes_to_string[3])+i)+'.column'+(parseInt(classes_to_string[11])+i)).className.includes("contain")){
                    there_is_legal_move = true;
                    if(mark_legal_move){
                        document.querySelector('.row'+(parseInt(classes_to_string[3])+i)+'.column'+(parseInt(classes_to_string[11])+i)).style.backgroundColor = "#87bdff";
                        document.querySelector('.row'+(parseInt(classes_to_string[3])+i)+'.column'+(parseInt(classes_to_string[11])+i)).classList.add("may_cont_"+ (is_it_white_turn ? "white" : "black") +"_king");
                    }
                }
            }
        }
    }
    else{
        let cell_row = classes_to_string[3]
        let cell_column = classes_to_string[11]
        console.log("enter");
        for(let i = 1; i<65 ; i++){
            const element_to_check = document.getElementById("cell"+i);
            let classes_to_string_checking_element = element_to_check.className;
            if(classes_to_string.includes("contain_white_piece") && is_it_white_turn) {
                if((!classes_to_string_checking_element.includes("contain")) && (classes_to_string_checking_element[3] == cell_row -1 ) && ((classes_to_string_checking_element[11] == cell_column-1) || (classes_to_string_checking_element[11]-1 == cell_column))){
                    there_is_legal_move = true;
                    if(mark_legal_move){
                        document.getElementById("cell"+i).style.backgroundColor = "#87bdff";
                        document.getElementById("cell"+i).classList.add("may_cont_white_piece");
                    }
                }
            }
            else if(classes_to_string.includes("contain_black_piece") && !is_it_white_turn){
                if((!classes_to_string_checking_element.includes("contain")) && (classes_to_string_checking_element[3]-1 == cell_row) && ((classes_to_string_checking_element[11]-1 == cell_column) || (classes_to_string_checking_element[11] == cell_column-1))){
                    there_is_legal_move = true;
                    if(mark_legal_move){
                        document.getElementById("cell"+i).style.backgroundColor = "#87bdff";
                        document.getElementById("cell"+i).classList.add("may_cont_black_piece");
                    }
                }
            }
        }
    }
    return there_is_legal_move;
}
function move_piece(id_cell_to_move){
    for(let i = 1; i<65 ; i++){
        const element = document.getElementById("cell"+i);
        let classes_to_string = element.className;
        if(classes_to_string.includes("move_now")){
            if(classes_to_string.includes("contain_white_piece")) {
                document.getElementById(id_cell_to_move).classList.remove("may_cont_white_piece");
                document.getElementById(id_cell_to_move).innerHTML = '<span class="white_piece"></span>';
                document.getElementById(id_cell_to_move).classList.add("contain_white_piece"); 
            }
            else if(classes_to_string.includes("contain_black_piece")){
                document.getElementById(id_cell_to_move).classList.remove("may_cont_black_piece");
                document.getElementById(id_cell_to_move).innerHTML = '<span class="black_piece"></span>';
                document.getElementById(id_cell_to_move).classList.add("contain_black_piece");
            }
            if(classes_to_string.includes("contain_white_king")) {
                document.getElementById(id_cell_to_move).classList.remove("may_eat_and_cont_white_king");
                document.getElementById(id_cell_to_move).classList.remove("may_cont_white_king");
                document.getElementById(id_cell_to_move).innerHTML = '<span class="white_king"></span>';
                document.getElementById(id_cell_to_move).classList.add("contain_white_king"); 
                document.getElementById("cell"+i).classList.remove("contain_white_king");
            }
            else if(classes_to_string.includes("contain_black_king")){
                document.getElementById(id_cell_to_move).classList.remove("may_eat_and_cont_black_king");
                document.getElementById(id_cell_to_move).classList.remove("may_cont_black_king");
                document.getElementById(id_cell_to_move).innerHTML = '<span class="black_king"></span>';
                document.getElementById(id_cell_to_move).classList.add("contain_black_king");
                document.getElementById("cell"+i).classList.remove("contain_black_king");
            }
        }
    } 
    color_board()
    claer_every_empty_cells();
}
function reset_cell(id_cell_to_reset){
    const element1 = document.getElementById(id_cell_to_reset);
    let classes_to_string1 = element1.className;
    if(classes_to_string1.includes("contain_white_piece"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("contain_white_piece");
    if(classes_to_string1.includes("contain_black_piece")) 
        document.querySelector('#' + id_cell_to_reset).classList.remove("contain_black_piece");
    if(classes_to_string1.includes("may_cont_white_piece"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_cont_white_piece");
    if(classes_to_string1.includes("may_cont_black_piece"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_cont_black_piece");
    if(classes_to_string1.includes("move_now")){
        document.querySelector('#' + id_cell_to_reset).classList.remove("move_now");
        document.querySelector("#" + id_cell_to_reset + ' > span').remove();
    }
    if(classes_to_string1.includes("i_may_be_edible"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("i_may_be_edible"); 
    if(classes_to_string1.includes("may_eat_and_cont_white_piece1"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_white_piece1");  
    if(classes_to_string1.includes("may_eat_and_cont_white_piece2"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_white_piece2"); 
    if(classes_to_string1.includes("may_eat_and_cont_white_piece3"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_white_piece3"); 
    if(classes_to_string1.includes("may_eat_and_cont_white_piece4"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_white_piece4"); 
    if(classes_to_string1.includes("may_eat_and_cont_black_piece1"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_black_piece1");  
    if(classes_to_string1.includes("may_eat_and_cont_black_piece2"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_black_piece2"); 
    if(classes_to_string1.includes("may_eat_and_cont_black_piece3"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_black_piece3"); 
    if(classes_to_string1.includes("may_eat_and_cont_black_piece4"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_black_piece4"); 
    if(classes_to_string1.includes("may_eat_and_cont_white_king1"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_white_king1");  
    if(classes_to_string1.includes("may_eat_and_cont_white_king2"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_white_king2"); 
    if(classes_to_string1.includes("may_eat_and_cont_white_king3"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_white_king3"); 
    if(classes_to_string1.includes("may_eat_and_cont_white_king4"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_white_king4"); 
    if(classes_to_string1.includes("may_eat_and_cont_black_king1"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_black_king1");  
    if(classes_to_string1.includes("may_eat_and_cont_black_king2"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_black_king2"); 
    if(classes_to_string1.includes("may_eat_and_cont_black_king3"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_black_king3"); 
    if(classes_to_string1.includes("may_eat_and_cont_black_king4"))
        document.querySelector('#' + id_cell_to_reset).classList.remove("may_eat_and_cont_black_king4"); 
}
function can_i_eat(id_cell_to_check ,is_it_white_turn, mark_legal_move){
    let result = false;
    const element2 = document.getElementById(id_cell_to_check);
    let classes_to_string3 = element2.className;
    if((classes_to_string3.includes("white_king")&&is_it_white_turn)||(classes_to_string3.includes("black_king")&&!is_it_white_turn)){
        let continue_looking_up_left = true;
        let continue_looking_up_right = true;
        let continue_looking_down_left = true;
        let continue_looking_down_right = true;
        for(let i =1;i<8;i++){
            if((continue_looking_up_left) && (classes_to_string3[3]-i <1 || classes_to_string3[11]-i <1||(classes_to_string3[3]-i > 0 && classes_to_string3[11]-i >0 &&
                document.querySelector('.row'+(classes_to_string3[3]-i)+'.column'+(classes_to_string3[11]-i)).className.includes("contain_"+ (is_it_white_turn ? "white" : "black") +"_piece")))){
                console.log("up left failed" + i);
                continue_looking_up_left = false;
                }
            if((continue_looking_up_right)&& (classes_to_string3[3]-i <1 || parseInt(classes_to_string3[11])+i>8||(classes_to_string3[3]-i >0 && parseInt(classes_to_string3[11])+i<9&&
                document.querySelector('.row'+(classes_to_string3[3]-i)+'.column'+(parseInt(classes_to_string3[11])+i)).className.includes("contain_"+ (is_it_white_turn ? "white" : "black") +"_piece")))){
                continue_looking_up_right = false;
                console.log("up right failed" + i);
                }
            if((continue_looking_down_left) && ((parseInt(classes_to_string3[3])+i>8) || classes_to_string3[11]-i <1||(parseInt(classes_to_string3[3])+i<9 && classes_to_string3[11]-i >0&&
                document.querySelector('.row'+(parseInt(classes_to_string3[3])+i)+'.column'+(classes_to_string3[11]-i)).className.includes("contain_"+ (is_it_white_turn ? "white" : "black") +"_piece")))){
                continue_looking_down_left = false;
                console.log("down left failed" + i);
                //console.log(document.querySelector('.row'+(parseInt(classes_to_string3[3])+i)+'.column'+(classes_to_string3[11]-i)).className);
                }
            if((continue_looking_down_right)&& ((parseInt(classes_to_string3[3])+i>8) || (parseInt(classes_to_string3[11])+i>8)||(parseInt(classes_to_string3[3])+i<9 && (parseInt(classes_to_string3[11])+i<9)&&
                document.querySelector('.row'+(parseInt(classes_to_string3[3])+i)+'.column'+(parseInt(classes_to_string3[11])+i)).className.includes("contain_"+ (is_it_white_turn ? "white" : "black") +"_piece")))){
                continue_looking_down_right = false;
                console.log("down right failed" + i);
                //onsole.log(document.querySelector('.row'+(parseInt(classes_to_string3[3])+i)+'.column'+(parseInt(classes_to_string3[11])+i)).className);
                }


            if( continue_looking_up_left && classes_to_string3[3]-(i+1) > 0 && classes_to_string3[11]-(i+1) > 0 &&
                document.querySelector('.row'+(classes_to_string3[3]-i)+'.column'+(classes_to_string3[11]-i)).className.includes("contain_"+ (is_it_white_turn ? "black" : "white"))
            && !document.querySelector('.row'+(classes_to_string3[3]-(i+1))+'.column'+(classes_to_string3[11]-(i+1))).className.includes("contain")){
                continue_looking_up_left = false;
                result = true;
                if(mark_legal_move){
                    document.querySelector('.row'+(classes_to_string3[3]-(i+1))+'.column'+(classes_to_string3[11]-(i+1))).style.backgroundColor = "#87bdff";
                    document.querySelector('.row'+(classes_to_string3[3]-(i+1))+'.column'+(classes_to_string3[11]-(i+1))).classList.add("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_king1");
                }
            }else if(continue_looking_up_left && classes_to_string3[3]-(i+1) > 0 && classes_to_string3[11]-(i+1) > 0 &&
            document.querySelector('.row'+(classes_to_string3[3]-i)+'.column'+(classes_to_string3[11]-i)).className.includes("contain_"+ (is_it_white_turn ? "black" : "white"))
            && document.querySelector('.row'+(classes_to_string3[3]-(i+1))+'.column'+(classes_to_string3[11]-(i+1))).className.includes("contain")){
                continue_looking_up_left = false;
            }

            if( continue_looking_up_right && classes_to_string3[3]-(i+1) > 0 && parseInt(classes_to_string3[11])+(i+1) <9 &&
                document.querySelector('.row'+(classes_to_string3[3]-i)+'.column'+(parseInt(classes_to_string3[11])+i)).className.includes("contain_"+ (is_it_white_turn ? "black" : "white"))
            && !document.querySelector('.row'+(classes_to_string3[3]-(i+1))+'.column'+(parseInt(classes_to_string3[11])+(i+1))).className.includes("contain")){
                continue_looking_up_right = false;
                result = true;
                if(mark_legal_move){
                    document.querySelector('.row'+(classes_to_string3[3]-(i+1))+'.column'+(parseInt(classes_to_string3[11])+(i+1))).style.backgroundColor = "#87bdff";
                    document.querySelector('.row'+(classes_to_string3[3]-(i+1))+'.column'+(parseInt(classes_to_string3[11])+(i+1))).classList.add("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_king2");
                }
            }else if( continue_looking_up_right && classes_to_string3[3]-(i+1) > 0 && parseInt(classes_to_string3[11])+(i+1) <9 &&
            document.querySelector('.row'+(classes_to_string3[3]-i)+'.column'+(parseInt(classes_to_string3[11])+i)).className.includes("contain_"+ (is_it_white_turn ? "black" : "white"))
            && document.querySelector('.row'+(classes_to_string3[3]-(i+1))+'.column'+(parseInt(classes_to_string3[11])+(i+1))).className.includes("contain")){
                continue_looking_up_right = false;
            }

            if( continue_looking_down_left && parseInt(classes_to_string3[3])+(i+1) <9 && classes_to_string3[11]-(i+1) > 0 &&
                document.querySelector('.row'+(parseInt(classes_to_string3[3])+i)+'.column'+(classes_to_string3[11]-i)).className.includes("contain_"+ (is_it_white_turn ? "black" : "white"))
            && !document.querySelector('.row'+(parseInt(classes_to_string3[3])+(i+1))+'.column'+(classes_to_string3[11]-(i+1))).className.includes("contain")){
                continue_looking_down_left = false;
                result = true;
                if(mark_legal_move){
                    document.querySelector('.row'+(parseInt(classes_to_string3[3])+(i+1))+'.column'+(classes_to_string3[11]-(i+1))).style.backgroundColor = "#87bdff";
                    document.querySelector('.row'+(parseInt(classes_to_string3[3])+(i+1))+'.column'+(classes_to_string3[11]-(i+1))).classList.add("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_king3");
                }
            }else if( continue_looking_down_left && parseInt(classes_to_string3[3])+(i+1) <9 && classes_to_string3[11]-(i+1) > 0 &&
            document.querySelector('.row'+(parseInt(classes_to_string3[3])+i)+'.column'+(classes_to_string3[11]-i)).className.includes("contain_"+ (is_it_white_turn ? "black" : "white"))
            && document.querySelector('.row'+(parseInt(classes_to_string3[3])+(i+1))+'.column'+(classes_to_string3[11]-(i+1))).className.includes("contain")){
                continue_looking_down_left = false;
            }

            if( continue_looking_down_right && parseInt(classes_to_string3[3])+(i+1) <9 && parseInt(classes_to_string3[11])+(i+1) <9 &&
                document.querySelector('.row'+(parseInt(classes_to_string3[3])+i)+'.column'+(parseInt(classes_to_string3[11])+i)).className.includes("contain_"+ (is_it_white_turn ? "black" : "white"))
            && !document.querySelector('.row'+(parseInt(classes_to_string3[3])+(i+1))+'.column'+(parseInt(classes_to_string3[11])+(i+1))).className.includes("contain")){
                continue_looking_down_right = false;
                result = true;
                if(mark_legal_move){
                    document.querySelector('.row'+(parseInt(classes_to_string3[3])+(i+1))+'.column'+(parseInt(classes_to_string3[11])+(i+1))).style.backgroundColor = "#87bdff";
                    document.querySelector('.row'+(parseInt(classes_to_string3[3])+(i+1))+'.column'+(parseInt(classes_to_string3[11])+(i+1))).classList.add("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_king4");
                }
            }else if( continue_looking_down_right && parseInt(classes_to_string3[3])+(i+1) <9 && parseInt(classes_to_string3[11])+(i+1) <9 &&
            document.querySelector('.row'+(parseInt(classes_to_string3[3])+i)+'.column'+(parseInt(classes_to_string3[11])+i)).className.includes("contain_"+ (is_it_white_turn ? "black" : "white"))
        && document.querySelector('.row'+(parseInt(classes_to_string3[3])+(i+1))+'.column'+(parseInt(classes_to_string3[11])+(i+1))).className.includes("contain")){
                continue_looking_down_right = false;
            }
        }
        
    }
    else{
        if(classes_to_string3.includes("contain_"+ (is_it_white_turn ? "white" : "black"))){
            if(classes_to_string3[3]-2 > 0 && classes_to_string3[11]-2 > 0){//up left
                const element3  = document.querySelector('.row'+(classes_to_string3[3]-1)+'.column'+(classes_to_string3[11]-1));
                let class_to_check = element3.className;
                if(class_to_check.includes("contain_"+ (is_it_white_turn ? "black" : "white"))){
                    let class_to_check1 = document.querySelector('.row'+(classes_to_string3[3]-2)+'.column'+(classes_to_string3[11]-2)).className;
                    if(!class_to_check1.includes("contain_black")&&!class_to_check1.includes("contain_white")){
                        if(mark_legal_move){
                            document.querySelector('.row'+(classes_to_string3[3]-2)+'.column'+(classes_to_string3[11]-2)).style.backgroundColor = "#87bdff";
                            document.querySelector('.row'+(classes_to_string3[3]-2)+'.column'+(classes_to_string3[11]-2)).classList.add("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_piece1");
                        }
                        result = true;
                    }
                }
            }
            if(classes_to_string3[3]-2 > 0 && parseInt(classes_to_string3[11])+2 < 9){//up right
                class_to_check  = document.querySelector('.row'+(classes_to_string3[3]-1)+'.column'+(parseInt(classes_to_string3[11])+1)).className
                if(class_to_check.includes("contain_"+ (is_it_white_turn ? "black" : "white"))){
                    let class_to_check1 = document.querySelector('.row'+(classes_to_string3[3]-2)+'.column'+(parseInt(classes_to_string3[11])+2)).className;
                    if(!class_to_check1.includes("contain_black")&&!class_to_check1.includes("contain_white")){
                        if(mark_legal_move){
                            document.querySelector('.row'+(classes_to_string3[3]-2)+'.column'+(parseInt(classes_to_string3[11])+2)).style.backgroundColor = "#87bdff";
                            document.querySelector('.row'+(classes_to_string3[3]-2)+'.column'+(parseInt(classes_to_string3[11])+2)).classList.add("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_piece2");
                        }
                        result = true;
                    }
                }
            }
            if(parseInt(classes_to_string3[3])+2 <9 && classes_to_string3[11]-2 > 0){// down left
                const element3  = document.querySelector('.row'+(parseInt(classes_to_string3[3])+1)+'.column'+(classes_to_string3[11]-1));
                let class_to_check = element3.className;
                if(class_to_check.includes("contain_"+ (is_it_white_turn ? "black" : "white"))){
                    let class_to_check1 = document.querySelector('.row'+(parseInt(classes_to_string3[3])+2)+'.column'+(classes_to_string3[11]-2)).className;
                    if(!class_to_check1.includes("contain_black")&&!class_to_check1.includes("contain_white")){
                        if(mark_legal_move){
                            document.querySelector('.row'+(parseInt(classes_to_string3[3])+2)+'.column'+(classes_to_string3[11]-2)).style.backgroundColor = "#87bdff";
                            document.querySelector('.row'+(parseInt(classes_to_string3[3])+2)+'.column'+(classes_to_string3[11]-2)).classList.add("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_piece3");
                        }
                        result = true;
                    }
                }
            }
            if(parseInt(classes_to_string3[3])+2 <9 && parseInt(classes_to_string3[11])+2 < 9){// down right
                class_to_check  = document.querySelector('.row'+(parseInt(classes_to_string3[3])+1)+'.column'+(parseInt(classes_to_string3[11])+1)).className
                if(class_to_check.includes("contain_"+ (is_it_white_turn ? "black" : "white"))){
                    let class_to_check1 = document.querySelector('.row'+(parseInt(classes_to_string3[3])+2)+'.column'+(parseInt(classes_to_string3[11])+2)).className;
                    if(!class_to_check1.includes("contain_black")&&!class_to_check1.includes("contain_white")){
                        if(mark_legal_move){
                            document.querySelector('.row'+(parseInt(classes_to_string3[3])+2)+'.column'+(parseInt(classes_to_string3[11])+2)).style.backgroundColor = "#87bdff";
                            document.querySelector('.row'+(parseInt(classes_to_string3[3])+2)+'.column'+(parseInt(classes_to_string3[11])+2)).classList.add("may_eat_and_cont_"+ (is_it_white_turn ? "white" : "black") +"_piece4");
                        }
                        result = true;
                    }
                }
            }
        }
    }
    return result;
}