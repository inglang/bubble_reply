function findReply(inputText, resultText) {
    try {
        resultText.value = run(resultText, inputText.value);
    }
    catch (e) {
        resultText.value = e;
    }
}

function run(resultText, text){
    ing_list = [];
    me_list = [];
    duf_list = [];
    temp = "";
    count = 0;
    
    // turn 0 = 나 
    // turn 1 = 잉
    turn = 1;
    lines = text.split("\n");


    for(let line of lines){
        count += 1;
        resultText.value = count.toString();
        me_chat = line.split(", 나 : ");
        if(me_chat.length > 1){
            turn = 0;
            continue;
        }

        
        chat = line.split(", 잉✨️ : ");;
        // 문자열에 ", 잉✨️ : " 가 포함되어있다면 저장 시작
        if (chat.length > 1){
            if (chat[1].indexOf("/이모티콘/") != -1){
                continue
            }
            ing_list.push(temp);
            turn = 1;
            temp = "";
            temp += chat[1] + "\n";
        }
        // 문자열에 ", 잉✨️ : " 이 포함되어있지 않지만 turn 이 1 이라면 문장 이어짐
        else if (turn == 1) {
            temp += chat[0] + "\n";
        }
    }

    count = 0
    temp = ""

    for(let line of lines){
        count += 1;
        resultText.value = count.toString();
        chat = line.split(", 잉✨️ : ");
        if(chat.length > 1){
            turn = 1
            continue;
        }

        
        me_chat = line.split(", 나 : ");
        // 문자열에 ", 나 : " 가 포함되어있다면 매칭 시작
        if (me_chat.length > 1){
            if (me_chat[1].indexOf("/이모티콘/") != -1){
                continue;
            }
            for(let ing_chat of ing_list){
            
                if (ing_chat.indexOf(temp) == 0 && ing_chat.indexOf("👉") != -1){
                    duf_list.push([ing_chat,temp])
                    break
                }
            }
            me_list.push(temp)
            turn = 0;
            temp = "";
            temp += me_chat[1] + "\n";
        }
        // 문자열에 ", 잉✨️ : " 이 포함되어있지 않지만 turn 이 1 이라면 문장 이어짐
        else if (turn == 0) {
            temp += me_chat[0] + "\n";
        }
    }
    result = ""

    // for(let i of ing_list){
    //     result += i + "\n"
    // }
    // result += "------------------------------\n"
    // for(let i of me_list){
    //     result += i + "\n"
    // }

    for(let i in duf_list){
        result += i.toString() + "\n"
        result += "잉 - " + duf_list[i][0] + "\n"
        result += "나 - " + duf_list[i][1] + "\n"
        result += "----------------\n"
    }
    return result;
}