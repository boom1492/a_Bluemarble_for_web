var Field_list = new Array(40);
// Field List Global Variable.
var Player_list = new Array(4);
var Player_color = new Array(4);
var Player_number = [0, 0, 0, 0];

var mTurnNumber = 0;
var mTurnState = 0;
var mFund = 0;

var mColor = ['red', 'blue', 'green', 'yellow'];

//복지기금
var STATE_TOLL = 0, STATE_BUYLAND = 1, STATE_BUILD = 2, STATE_GOLDENKEY = 3, STATE_ALONE = 4, STATE_SPACETRIP = 5, STATE_FUND = 6, STATE_RECVFUND = 7, STATE_DICE = 8, STATE_DOUBLE = 9;

function Field(name) {
    this.td = 0;
    this.name = name;
    this.villa = 0;
    this.building = 0;
    this.hotel = 0;
    this.price_villa = 0;
    this.price_builing = 0;
    this.price_hotel = 0;
    this.toll_villa = 0;
    this.toll_builing = 0;
    this.toll_hotel = 0;
    this.toll_default = 0;
    this.value = 0;
    this.owner = -1;
    this.available = 1;
}

function Player(number, actorID) {
    this.number = number;
    this.location = 0;
    this.actorID = actorID;
    this.item = {};
    this.money = 0;
    this.playerName = "player" + this.number;
    this.countAlone = 0;
    this.ready = 0;

}

function test() {
    //test code
    joinPlayer("123", "개똥");
    joinPlayer("321", "스티브");
    movePlayer(0, 5);
    movePlayer(1, 3);
    movePlayer(1, 7);
    joinPlayer("3432", "제임스");
    movePlayer(2, 1);
    joinPlayer("324", "마리오");
    movePlayer(3, 10);
}

function joinPlayer(actorID, name) {
    for( i = 0; i < 4; i++) {
        if(Player_number[i] == 0) {
            Player_list[i] = new Player(i, actorID);
            Player_list[i].playerName = name;
            if(name==null || name ==""){
                Player_list[i].playerName = "플레이어" + i;
            }
            Player_number[i] = 1;
            Player_list[i].money = 2000000;
            $('#log').append("<br/><span class='name_player" + i + "'>" + Player_list[i].playerName + "</span> 접속");
            $('.name_player' + i).html(Player_list[i].playerName);
            $('#init_player' + i).show();
            $('#stat_player' + i).show();
            redraw(i);
            return i;
        }
    }
    alert("Full.");
    return false;
}

function leavePlayer(number) {
    $('#log').append("<br/><span class='name_player" + number + "'>" + Player_list[number].playerName + "</span> 퇴장");
    //$('.name_player' + number).html("");
    $('#init_player' + number).hide();
    $('#stat_player' + number).hide();
    $('#ready_player' + number).hide();
    Field_list[Player_list[number].location].td.css('background-color', '');
    Field_list[Player_list[number].location].td.css('opacity', '0.7');
//    Player_list[number] = null;
    Player_number[number] = 0;
}

function movePlayer(player, index) {
    Field_list[Player_list[player].location].td.css('background-color', '');
    Field_list[Player_list[player].location].td.css('opacity', '0.7');
    Player_list[player].location = index;
    Field_list[index].td.css('background-color', Player_color[player]);
    Field_list[index].td.css('opacity', 1);

    $('#log').append("<br/><span class='name_player" + player + "'>" + Player_list[player].playerName + "</span> " + Field_list[index].name + "(으)로 이동");
    redraw(player);
}

function gameover(player){
     junction.sendMessageToSession({
                    'service' : 'gameover',
                    'number' : player
     });
     Player_number[player] = 0;
     leavePlayer(player);
               
     $('#log').append("<br/><span class='name_player" + player + "'>" + Player_list[player].playerName + "</span> " + "게임 오버");
                
}
function actionNext(player, index) {
    var state = STATE_TOLL;
    switch(index) {
        case 2:
        case 7:
        case 12:
        case 17:
        case 22:
        case 35:
            // 황금열쇠
            state = STATE_GOLDENKEY;
            break;
        case 10:
            //무인도
            state = STATE_ALONE;
            break;
        case 0:
            //출발
            break;
        case 20:
            state = STATE_RECVFUND;
            // 사회복지 기금 접수처
            break;
        case 38:
            state = STATE_FUND;
            // 사회복지기금 내는 곳
            break;
        case 30:
            // 우주여행
            state = STATE_SPACETRIP;
            break;
    }
    if(state == STATE_FUND) {
        if(Player_list[player].money < 150000) {
            gameover(player);
        } else {
            Player_list[player].money -= 150000;
            mFund += 150000;
        }
    } else if(state == STATE_RECVFUND) {
        Player_list[player].money += mFund;
        mFund = 0;
    } else if(state == STATE_ALONE) {
        Player_list[player].countAlone++;
    } else if(state == STATE_GOLDENKEY) {

    } else if(state == STATE_TOLL) {
        if(Field_list[index].owner == -1) {
            state = STATE_BUYLAND;
            //구매의사
            //alert("구매하시겠습니까");
        } else {
            var toll = Field_list[index].toll_default;
            toll += (Field_list[index].villa == 1) ? Field_list[index].toll_villa : 0;
            toll += (Field_list[index].building == 1) ? Field_list[index].toll_building : 0;
            toll += (Field_list[index].hotel == 1) ? Field_list[index].toll_hotel : 0;

            if(Player_list[player].money < toll) {
                //게임 오버 처리
                gameover(player);
            } else {
                // 비용 지불
                Player_list[player].money -= toll;
                // 땅의 주인은 그만큼의 비용을 받음
                Player_list[Field_list[Player_list[player].location].owner].money += toll;
                junction.sendMessageToSession({
                    'service' : 'turn',
                    'number' : player,
                    'recevier_number' : Field_list[Player_list[player].location].owner,
                    'state' : 'STATE_TOLL',
                    'toll' : toll
                });
                $('#log').append("<br/><span class='name_player" + player + "'>" + Player_list[player].playerName + "</span> " + toll + "원 지불");
      
            }
        }

    }
    redraw(player);
}

function salary(player) {
    Player_list[player].money += 200000;
    redraw(player);
}

function buyLand(player, index) {
    if(Field_list[index].owner != -1) {
        alert("이미 소유자 있음");
        return false;
        // 소유자 있음
    } else {
        if(Field_list[index].value > Player_list[player].money) {
            alert("소지 금액 부족");
            return false;
            // 소지 금액 부족
        } else if(Field_list[index].available == 0) {
            alert("건설 불가 지역");
            return false;
            // 건설 불가 지역
        } else {
            Player_list[player].money -= Field_list[index].value;
            Field_list[index].owner = player;
            $('#log').append("<br/><span class='name_player" + player + "'>" + Player_list[player].playerName + "</span> " + Field_list[index].name + "구매");
            redraw(player);
            return true;
        }
    }
    return false;
    // 예상치 못한 예외
}

function build(player, index, building) {
    var val = 0;
    if(building == 0) {
        val = Field_list[index].price_villa;
    } else if(building == 1) {
        val = Field_list[index].price_building;
    } else if(building == 2) {
        val = Field_list[index].price_hotel;
    }
    if(Field_list[index].owner == player) {

        var build_name;
        if(Player_list[player].money < val) {
            alert("소유 금액 부족");
            return false;
            // 소유 금액 부족
        } else {
            switch(building) {
                case 0:
                    build_name = "별장";
                    Field_list[index].villa = 1;
                    Player_list[player].money -= Field_list[index].price_villa;
                    break;
                case 1:
                    build_name = "빌딩";
                    Field_list[index].building = 1;
                    Player_list[player].money -= Field_list[index].price_building;
                    break;
                case 2:
                    build_name = "호텔";
                    Field_list[index].hotel = 1;
                    Player_list[player].money -= Field_list[index].price_hotel;
                    break;
                default:
                    alert("유효하지 않은 건물");
                    return false;

            }
        }
        $('#log').append("<br/><span class='name_player" + player + "'>" + Player_list[player].playerName + "</span> " + build_name + "건설");
        redraw(player);
        return true;
    } else {
        alert("소유주가 아님 : (소유)" + Field_list[index].owner + "(요구)" + player);
        return false;
        // 소유주가 아님
    }
    return false;
    // 예외
}

function dice(player, n1, n2) {
    var db = false;
    if(n1 == n2) {
        Player_list[player].countAlone = 0;
        db = true;
    }
    var nextLocation = Player_list[player].location + n1 + n2;
    if(nextLocation>=40){
        salary(player);
        nextLocation -= 40;
    }
    movePlayer(player, nextLocation);
    return db;
}

function redraw(player) {
    $('#money_player' + player).html(Player_list[player].money);
    $('#name_player' + player).html(Player_list[player].playerName);

    if(Field_list[Player_list[player].location].villa == 1) {
        Field_list[Player_list[player].location].td.children().children('.f_bottom').children('.f_bottom_1').css('opacity', 1.0);
    }
    if(Field_list[Player_list[player].location].building == 1) {
        Field_list[Player_list[player].location].td.children().children('.f_bottom').children('.f_bottom_2').css('opacity', 1.0);
    }
    if(Field_list[Player_list[player].location].hotel == 1) {
        Field_list[Player_list[player].location].td.children().children('.f_bottom').children('.f_bottom_3').css('opacity', 1.0);

    }
    if(Field_list[Player_list[player].location].owner!=-1){
        Field_list[Player_list[player].location].td.children().children('.f_top').css('background-color', mColor[Field_list[Player_list[player].location].owner]);
    }
}

function startGame() {
    $('#body').show();
    $('#initPage').hide();
    var cnt = 0;
    for( i = 0; i < 4; i++) {
        if(Player_number == 1) {
            cnt++;
        }
    }
    for( i = 0; i < 4; i++) {
        if(Player_number[i] == 1) {
            mTurnNumber = i;
            break;
        }
    }
    mTurnState = STATE_DICE;

    for( i = 0; i < 4; i++) {
        if(Player_number[i]==1)
            $('#money_player' + i).html(Player_list[i].money);
    }
    turn(mTurnNumber, STATE_DICE);
}

function nextTurn() {
    while(true) {
        mTurnNumber++;
        if(mTurnNumber == 4) {
            mTurnNumber = 0;
        }
        if(Player_number[mTurnNumber] == 1) {
            break;
        }
    }
    turn(mTurnNumber, STATE_DICE);
}

function turn(number, state) {

    if(state == STATE_DICE) {
        var str = Player_list[number].playerName + "님의 차례입니다. 주사위를 굴려주세요.";
        $('#turnInfo').html(str);
        junction.sendMessageToSession({
            'service' : 'turn',
            'number' : number,
            'state' : state
        });
    } else if(state == STATE_BUYLAND) {
        var str = Player_list[number].playerName + "님, " + Field_list[Player_list[number].location].name + "을 매입하시겠습니까?";
        $('#turnInfo').html(str);
        junction.sendMessageToSession({
            'service' : 'turn',
            'number' : number,
            'state' : state,
            'location' : Player_list[number].location,
            'locationName' : Field_list[Player_list[number].location].name,
            'locationValue' : Field_list[Player_list[number].location].value,
            'locationOwner' : Field_list[Player_list[number].location].owner,
            'playerMoney' : Player_list[number].money
        });
    } else if(state == STATE_BUILD) {
        var str = Player_list[number].playerName + "님, " + Field_list[Player_list[number].location].name + "에 건물을 건설 하시겠습니까?";
        $('#turnInfo').html(str);
        junction.sendMessageToSession({
            'service' : 'turn',
            'number' : number,
            'state' : state,
            'location' : Player_list[number].location,
            'locationName' : Field_list[Player_list[number].location].name,
            'state_villa' : Field_list[Player_list[number].location].villa,
            'state_building' : Field_list[Player_list[number].location].building,
            'state_hotel' : Field_list[Player_list[number].location].hotel,
            'value_villa' : Field_list[Player_list[number].location].price_villa,
            'value_building' : Field_list[Player_list[number].location].price_building,
            'value_hotel' : Field_list[Player_list[number].location].price_hotel,
            'toll_villa' : Field_list[Player_list[number].location].toll_villa,
            'toll_building' : Field_list[Player_list[number].location].toll_building,
            'toll_hotel' : Field_list[Player_list[number].location].toll_hotel,
            'playerMoney' : Player_list[number].money
        });
    }

}

function ready(number) {
    if(Player_list[number].ready==0){
        Player_list[number].ready = 1;
        $('#ready_player' + number).show();
        var cnt = 0;
        var cnt_ready = 0;
        for( i = 0; i < 4; i++) {
            cnt += Player_number[i];
            if(Player_number[i]) {
                cnt_ready += Player_list[i].ready;
            }
        }
        if(cnt == cnt_ready && cnt >= 2) {
            startGame();
        }
    } else{
        Player_list[number].ready = 0;
        $('#ready_player' + number).hide();
        
    }
    
}

function setJunction() {
    var script = {
        ad : "Bluemarble",
        sessionID : UUID,
        host : mHost
    };
    junction.onActivityJoin = function() {
        junction.sendMessageToSession({
            'service' : 'check',
            'actorID' : junction.actorID
        });
    }
    junction.onMessageReceived = function(msg) {
        if(msg.service == "join") {
            var number = 0;
            if(msg.actorID == null) {
                alert("잘못된 Join");
            } else {
                number = joinPlayer(msg.actorID, msg.name);
                var temp = new Array(4);
                for(i=0;i<4;i++){
                    if(Player_list[i]==null){
                        temp[i] = "";
                    } else{
                        temp[i] = Player_list[i].playerName;
                    }
                }
                
                junction.sendMessageToSession({
                    'service' : 'ackjoin',
                    'actorID' : msg.actorID,
                    'number' : number,
                    'name' : Player_list[number].playerName,
                    'namelist' : [temp[0], temp[1], temp[2], temp[3]]
                });
            }
        } else if(msg.service == "exit") {
            if(msg.number == null) {
                alert("잘못된 leave");
            } else {
                leavePlayer(msg.number);
            }
        } else if(msg.service == "ready") {
            if(msg.number == null) {
                alert("잘못된 ready");
            } else {
                ready(msg.number);
            }
        } else if(msg.service == "action") {
            if(msg.number == null) {
                alert("잘못된 플레이어");
            } else {
                if(msg.state == STATE_DICE) {
                    var db = dice(msg.number, msg.n1, msg.n2);
                    if(db == true) {
                        // junction.sendMessageToSession({
                            // 'service' : 'turn',
                            // 'number' : msg.number,
                            // 'state' : msg.state
                        // });
                        turn(msg.number, msg.state);
                    } else {
                        actionNext(msg.number, Player_list[msg.number].location);
                        // junction.sendMessageToSession({
                            // 'service' : 'turn',
                            // 'number' : msg.number,
                            // 'state' : STATE_BUYLAND
                        // });
                        if(Field_list[Player_list[msg.number].location].owner == -1 || Field_list[Player_list[msg.number].location].owner == msg.number && Field_list[Player_list[msg.number].location].available==1){
                            turn(msg.number, STATE_BUYLAND);
                        } else{
                            //황금열쇠, 구매불가지역에 대한 처리
                            nextTurn();
                        }
                    }
                } else if(msg.state == STATE_BUYLAND) {
                    if(msg.agree == 1) {
                        buyLand(msg.number, Player_list[msg.number].location);
                        if(Field_list[Player_list[msg.number].location].available == 1) {
                            // junction.sendMessageToSession({
                                // 'service' : 'turn',
                                // 'number' : msg.number,
                                // 'state' : STATE_BUILD
                            // });
                            turn(msg.number,STATE_BUILD);
                        } else {
                            nextTurn();
                        }
                    } else {
                        nextTurn();
                    }
                } else if(msg.state == STATE_BUILD) {
                    if(msg.build == 3) {
                        nextTurn();
                    } else {
                        build(msg.number, Player_list[msg.number].location, msg.build);
                        nextTurn();
                    }
                }
            }

        } else if(msg.service == "check") {
            if(msg.actorID!=junction.actorID){
                location.reload();
            }
        }
    }
    JX.getInstance(mHost).newJunction(script, junction);
}


$(document).ready(function() {
    Player_color = ['red', 'blue', 'green', 'yellow'];
    init();
    setJunction();
    //test();
    $('#testBox').keydown(function(e) {
        if(e.keyCode == 13)
            eval($('#testBox').val());
    });
});
